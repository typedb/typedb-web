import hubspot from './hubspot';

export const handleNewDiscussUser = async (req, res) => {
    // to be added as the value of `discuss_id` on the Hubspot account of the new Discuss user.
    // used to identify the Discuss user on Hubspot for future actions (e.g. topic_creation)
    const newHsDiscussId = `discuss_${req.body.user.id}`;

    try {
        const primaryEmail = req.body.user.email;

        let vidProp = await hubspot.getContactProps([], ["email", primaryEmail]);

        if (!vidProp && req.body.user.user_fields["1"] != null) {
            // no Hubspot contact owns the primaryEmail. Try looking up the secondaryEmail now
            const secondaryEmail = req.body.user.user_fields["1"].indexOf("@") > -1 ? req.body.user.user_fields["1"] : undefined;
            vidProp = await hubspot.getContactProps([], ["email", secondaryEmail]);
        }

        if (vidProp) {
            // there is a Hubspot contact with either the primaryEmail or the secondaryEmail
            await hubspot.setContactProps({ "discuss_id": newHsDiscussId }, ["vid", vidProp.vid]);
            const response = await hubspot.updateEngagement({
                vid: vidProp.vid,
                platform: "discuss",
                action: "signup"
            });
            console.log(`track call from ${req.get('host')}${req.originalUrl} - success: `, JSON.stringify({ status: 200, message: response.message }));
            res.status(200).send({ status: 200, message: response.message });
        }
    } catch (e) {
        console.log(`track call from ${req.get('host')}${req.originalUrl} - failure: `, JSON.stringify({ status: e.status, message: e.message }));
        res.status(e.status).send({ status: e.status, message: e.message });
    }
};

export const handleNewDiscussTopic = async (req, res) => {
    // used to look up the author of the newly created topic among Hubspot contacts
    const hsDiscussId = `discuss_${req.body.topic.created_by.id}`;

    try {
        const contact = await hubspot.getContactByProp(["discuss_id", hsDiscussId], ["discuss_id", "score"]);
        const response = await hubspot.updateEngagement({
            vid: contact.vid,
            platform: "discuss",
            action: "topicCreation",
            subject: req.body.topic.title
        });
        console.log(`track call from ${req.get('host')}${req.originalUrl} - success: `, JSON.stringify({ status: 200, message: response.message }));
        res.status(200).send({ status: 200, message: response.message });
    } catch (e) {
        console.log(`track call from ${req.get('host')}${req.originalUrl} - failure: `, JSON.stringify({ status: e.status, message: e.message }));
        res.status(e.status).send({ status: e.status, message: e.message });
    }
};