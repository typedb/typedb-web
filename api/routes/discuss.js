import express from 'express';
import validate from 'express-validation';
import Joi from 'joi';
import { handleNewDiscussUser,
         handleNewDiscussTopic } from '../helpers/discuss';

const router = express.Router();

router.post(
    '/discussEvent',
    validate({
        headers: {
            "x-discourse-event": Joi.string().allow(["topic_created", "user_created"])
        }
    }),
    (req, res) => {
        const discussEvent = req.headers["x-discourse-event"];

        if (discussEvent == "user_created") {
            handleNewDiscussUser(req, res);
        } else if (discussEvent == "topic_created") {
            handleNewDiscussTopic(req, res);
        } else {
            res.status(400).send({ status: 400, message: `${discussEvent} is not handled.` });
        }
    }
);

export default router;