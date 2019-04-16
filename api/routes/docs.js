import express from 'express';
import validate from 'express-validation';
import axios from 'axios';
import Joi from 'joi';

const router = express.Router();

router.get(
    '/searchDocs',
    validate({
        query: { q: Joi.string().required() }
    }),
    (req, res) => {
        const params = `cx=${process.env.CSE_ID}&key=${process.env.CSE_API_KEY}&q=${req.query.q}`;

        axios.get('https://www.googleapis.com/customsearch/v1?' + params)
            .then((response) => res.status(200).send(response.body))
            .catch((e) => {
                res.status(e.response.status).send(e.response.statusText);
            });
    }
);

export default router;