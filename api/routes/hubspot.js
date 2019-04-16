import express from 'express';
import validate from 'express-validation';
import Joi from 'joi';
import axios from 'axios';

const router = express.Router();

router.post(
    '/recordContact',
    validate({
        body: {
            ref: Joi.object({
                targetFormId: Joi.string().required(),
                utk: Joi.string().required(),
                pageUri: Joi.string().required(),
                pageName: Joi.string().required()
            }).required(),
            formFields: Joi.object().unknown().required()
        }
    }),
    (req, res) => {
        const { ref, formFields } = req.body;
        const { targetFormId, utk, pageUri, pageName } = ref;

        const formParams = { fields: [] };
        Object.keys(formFields).forEach((field) => formParams.fields.push({ name: field, value: formFields[field] }));
        formParams.context = { hutk: utk, pageUri, pageName };

        axios.post(
            'https://api.hsforms.com/submissions/v3/integration/submit/4332244/' + targetFormId,
            formParams
        )
            .then((response) => {
                res.status(200).send(JSON.stringify({ status: response.status, message: "Form details were successfully stored in the Hubspot form." }));
            })
            .catch((e) => {
                console.log(
                    "hubspot form submission call from " + req.get('host') + " - failure",
                    JSON.stringify({ status: e.response.status, message: e.response.data.errors })
                );
                res.status(200).send(JSON.stringify({ status: e.response.status, message: e.response.data.errors }));
            });
    }
);

export default router;