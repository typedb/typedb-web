import express from 'express';
import validate from 'express-validation';
import Joi from 'joi';
import engagement from '../helpers/engagement';
import hubspot from '../helpers/hubspot';

const router = express.Router();

router.post(
    '/hsengt',
    validate({
        body: Joi.object().keys({
            platform: Joi.string().required().valid(Object.keys(engagement.scores)),
            action: Joi.string().required(),
            subject: Joi.string(),
            subjectSpecific: Joi.object(),
            utk: Joi.string(), // Hubspot token stored as a cookie in the contact's browser
            vid: Joi.number() // HUbspot contact id
        }).xor('utk', 'vid')
    }),
    async function (req, res) {
        const response = await hubspot.updateEngagement(req.body);
        console.log(
            "track call from " + req.get('host') + req.originalUrl + " - " + (response.status == 200 ? "success" : "failure"),
            JSON.stringify({ status: response.status, message: response.message })
        );
        res.status(response.status).send({ status: response.status, message: response.message });
    }
);

export default router;
