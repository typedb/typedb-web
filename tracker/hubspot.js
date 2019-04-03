import 'babel-polyfill';
import axios from 'axios';


const getContactProp = async (key, prop, findBy, delay = 0) => {
    const params = `hapikey=${key}&property=score&propertyMode=value_only&formSubmissionMode=none`
    let vid, value;

    await new Promise(resolve => setTimeout(resolve, delay * 1000));

    let response;
    try {
        response = await axios.get(`https://api.hubapi.com/contacts/v1/contact/${findBy[0]}/${findBy[1]}/profile?${params}`)
        if (! response.data["is-contact"]) {
            return false;
        } else if (! response.data.properties[prop] || response.data.properties[prop].value == '') {
            value = 0;
        } else if (response.data.properties[prop].value){
            value = response.data.properties[prop].value;
        }
        response = { "vid": response.data.vid, value}
    } catch(e) {
        throw e.response.statusText;
    }

    return response;
};

const setContactProp = async (key, propValues, findBy) => {
    const params = `hapikey=${key}`;

    const payload = {
        "properties": []
    }
    for (const prop in propValues) {
        payload.properties.push({
            "property": prop,
            "value": propValues[prop]
        });
    }

    let response;
    try {
        response = await axios.post(
            `https://api.hubapi.com/contacts/v1/contact/${findBy[0]}/${findBy[1]}/profile?${params}`,
            payload
        );
    } catch (e) {
        throw e.response.statusText;
    }

    return response;
};

const getContactByProp = async (key, propValue, props, offset = 0) => {
    let params = `hapikey=${key}&count=1&vidOffset=${offset}&propertyMode=value_only&formSubmissionMode=none`;
    for (const prop of props) {
        params += "&property=" + prop;
    }

    try {
        const response = await axios.get(`https://api.hubapi.com/contacts/v1/lists/all/contacts/all?${params}`)
        for (const contact of response.data.contacts) {
            if (contact.properties[propValue[0]] && contact.properties[propValue[0]].value == propValue[1]) {
                return contact;
            }
        }
        if (response.data["has-more"]) {
            await getContactByProp(key, propValue, response.data["vid-offset"]);
        } else {
            return false;
        }
    } catch (e) {
        throw e.response.statusText;
    }
};

export default {
    getContactProp,
    setContactProp,
    getContactByProp
}