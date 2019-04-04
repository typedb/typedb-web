import 'babel-polyfill';
import axios from 'axios';


const getContactProp = async (prop, findBy) => {
    const key = process.env.HAPIKEY;
    const params = `hapikey=${key}&property=score&propertyMode=value_only&formSubmissionMode=none`

    try {
        // take 3 attempts (each attempt 3 seconds apart) to retrieve the contact
        for (let i = 0; i < 3; i++) {
            await new Promise(resolve => setTimeout(resolve, 3000));
            let response = await axios.get(`https://api.hubapi.com/contacts/v1/contact/${findBy[0]}/${findBy[1]}/profile?${params}`);
            if (response.data["is-contact"]) {
                // the property we're looking for may not be associated with the found contact, if so
                // set prop's value as undefined
                const propValue = response.data.properties[prop] ? response.data.properties[prop].value : undefined;
                return { "vid": response.data.vid, value: propValue };
            }
        }
    } catch (e) {
        throw { status: e.response.status, message: e.response.statusText };
    }

    return false;
};

const setContactProp = async (propValues, findBy) => {
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

export default {
    getContactProp,
    setContactProp,
    getContactByProp
}