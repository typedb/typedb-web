import express from 'express';
import validate from 'express-validation';
import Joi from 'joi';
import axios from 'axios';

const router = express.Router();

router.post(
    '/mailchimp',
    validate({
        body: {
            email: Joi.string().email().required({ minDomainAtoms: 2 }),
            firstname: Joi.string(),
            surname: Joi.string()
        }
    }),
    (req, res) => {
        console.log(`mailchimp invite call from ${req.get('host')} - payload`, JSON.stringify(req.body));

        const { email, firstname, surname } = req.body;

        axios.post(
            'https://us8.api.mailchimp.com/3.0/lists/3742a20dc0/members/',
            {
                "coc": 0,
                "merge_fields": {
                    "FNAME": firstname || "",
                    "LNAME": surname || ""
                },
                "email_address": email,
                "status": "subscribed"
            },
            {
                auth: {
                    username: 'haikalpribadi',
                    password: '5e7b3a7503eff7fdd336c095b128d139-us8'
                }
            }
        )
            .then((response) => {
                console.log(
                    "Mailchimp invite call from " + req.get('host') + " - success: ",
                    JSON.stringify({ status: response.status, message: response.statusText })
                )
                res.status(200).send({ status: 200, message: "Mailchimp invite was sent successfully" })
            })
            .catch((e) => {
                console.log(
                    "mailchimp invite call from " + req.get('host') + " - failure: ",
                    JSON.stringify({ status: e.response.data.status, message: e.response.data.detail })
                )
                res.status(e.response.data.status).send({ status: e.response.data.status, message: e.response.data.detail });
            });
    }
);

export default router;