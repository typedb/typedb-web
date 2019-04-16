import 'babel-polyfill';
import axios from 'axios';
import engagement from './engagement';
import MongoClient from 'mongodb';


const getHsContactsCollection = async () => {
    const mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/';
    const dbInstanceName = 'heroku_k5z2zm9h';

    try {
        const client = await MongoClient.connect(mongodbUri);
        const db = client.db(dbInstanceName);
        return db.collection('hs_contacts');
    } catch (e) {
        throw e;
    }
};

const getContactProps = async (props, findBy) => {
    const key = process.env.HAPIKEY;
    let params = `hapikey=${key}&&propertyMode=value_only&formSubmissionMode=none`

    for (const prop of props) { params += "&property=" + prop; }

    try {
        // take 3 attempts (each attempt 3 seconds apart) to retrieve the contact
        for (let i = 0; i < 3; i++) {
            await new Promise(resolve => setTimeout(resolve, 3000));
            let response = await axios.get(`https://api.hubapi.com/contacts/v1/contact/${findBy[0]}/${findBy[1]}/profile?${params}`);
            const result = {};
            if (response.data["is-contact"]) {
                result.vid = response.data.vid;

                for (const prop of props) {
                    // the property we're looking for may not be associated with the found contact, if so
                    // set prop's value as undefined
                    if (response.data.properties[prop]) {
                        result[prop] = response.data.properties[prop].value;
                    } else {
                        result[prop] = undefined;
                    }
                }
                return result;
            }
        }
    } catch (e) {
        return false;
    }

    return false;
};

const setContactProps = async (propValues, findBy) => {
    const key = process.env.HAPIKEY;
    const params = `hapikey=${key}`;

    const payload = { "properties": [] }
    for (const prop in propValues) {
        payload.properties.push({
            "property": prop,
            "value": propValues[prop]
        });
    }

    try {
        await axios.post(`https://api.hubapi.com/contacts/v1/contact/${findBy[0]}/${findBy[1]}/profile?${params}`, payload);
    } catch (e) {
        throw { status: e.response.statusText, message: e.response.statusText };
    }
};

// Hubspot's contacts/all endpoint, returns maximum 100 contacts at a time
// therefore, we need this function to recursively recall that endpoint until
// the target contact is found or it is guaranteed to not exist
const getContactByProp = async (propValue, props, offset = 0) => {
    const key = process.env.HAPIKEY;
    let params = `hapikey=${key}&count=100&vidOffset=${offset}&propertyMode=value_only&formSubmissionMode=none`;
    // define contact properties to retrieve
    for (const prop of props) { params += "&property=" + prop; }

    try {
        const response = await axios.get(`https://api.hubapi.com/contacts/v1/lists/all/contacts/all?${params}`)
        for (const contact of response.data.contacts) {
            if (contact.properties[propValue[0]] && contact.properties[propValue[0]].value == propValue[1]) {
                return contact;
            }
        }
        if (response.data["has-more"]) {
            return getContactByProp(propValue, props, response.data["vid-offset"]);
        } else {
            throw { status: e.response.status, message: e.response.statusText };
        }
    } catch (e) {
        throw { status: e.response.status, message: e.response.statusText };
    }
};

const getUpdatedScore = (currentScore, platform, action, subject) => {
    const scores = engagement.scores;

    let newScore;
    if (scores[platform][action][subject]) {
        newScore = Math.round((parseFloat(currentScore) + scores[platform][action][subject]) * 1000) / 1000;
    } else {
        newScore = Math.round((parseFloat(currentScore) + scores[platform][action]) * 1000) / 1000;
    }

    return newScore;
}

const getDefaultActivities = (platform) => {
    const scores = engagement.scores;
    const defaultActivities = {};

    for (const action in scores[platform]) { defaultActivities[action] = {}; }

    return defaultActivities;
}

const updateEngagement = async (trackPayload) => {
    console.log("track call - payload: ", JSON.stringify(trackPayload));

    let { vid, utk, platform, action, subject, subjectSpecific } = trackPayload;

    try {
        let engagementProps;
        if (vid) {
            engagementProps = await getContactProps(["score", `${platform}_activities`], ["vid", vid]);
        } else if (utk) {
            engagementProps = await getContactProps(["score", `${platform}_activities`], ["utk", utk]);
        }

        if (engagementProps) { // contact exists on hubspot (identified)
            // calculate the new score
            const currentScore = engagementProps.score || 0;
            const newScore = getUpdatedScore(currentScore, platform, action, subject);

            // update the platform activities
            const currentActivities = JSON.parse(engagementProps[`${platform}_activities`] || JSON.stringify(getDefaultActivities(platform)));
            const newActivities = engagement.updatedPlatformActivities(currentActivities, platform, action, subject, subjectSpecific);

            const newProps = { "score": newScore };
            newProps[`${platform}_activities`] = JSON.stringify(newActivities, null, 4);

            await setContactProps(newProps, ["vid", engagementProps.vid]);

            // deleting the contact from the hs_contacts (db) collection
            // we continue to track this contact using the hubspot API
            const hsContacts = await getHsContactsCollection();
            await hsContacts.deleteOne({ $or: [ { utk }, { vid } ] });

            return { status: 200, message: "Contact's score has been updated." };
        } else { // contact does NOT exist on hubspot (anonymous)
            const hsContacts = await getHsContactsCollection();
            const contact = await hsContacts.findOne({ $or: [ { utk }, { vid } ] });

            let currentScore, currentActivities;
            if (contact) {
                currentScore = contact.score;
                currentActivities = contact[`${platform}_activities`];
            } else { // contact is not found in db. using default values.
                currentScore = 0;
                currentActivities = getDefaultActivities(platform);
            }

            const newScore = getUpdatedScore(currentScore, platform, action, subject);
            const newActivities = engagement.updatedPlatformActivities(currentActivities, platform, action, subject, subjectSpecific);
            const updateBody = { score: newScore, utk, vid };
            updateBody[`${platform}_activities`] = newActivities;

            // if found, updates the contact, otherwise creates a new one
            await hsContacts.update({ $or: [ { utk }, { vid } ] }, updateBody, { upsert: true });

            return { status: 200, message: "Contact was tracked anonymously" };
        }
    } catch (e) {
        console.log(e);
        return { status: e.status, message: e.message };
    }
}

export default {
    getContactProps,
    setContactProps,
    getContactByProp,
    updateEngagement
}