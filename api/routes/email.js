import express from 'express';
import validate from 'express-validation';
import Joi from 'joi';
import nodemailer from 'nodemailer';

const router = express.Router();

router.post(
    '/enterprise',
    validate({
        body: Joi.object({
            emailTitle: Joi.string().required(),
            email: Joi.string().email({ minDomainAtoms: 2 }).required(),
        }).unknown()
    }),
    (req, res) => {
        // console.log(`email/enterprise call from ${req.get('host')} - payload`, JSON.stringify(req.body));

        // const { emailTitle, email, firstname, lastname, company, job, product, stage, aois, more } = req.body;

        // const mailOptions = {
        //     from: 'postmaster@mail.grakn.ai',
        //     to: 'enterprise@grakn.ai',
        //     subject: emailTitle,
        //     replyTo: email,
        //     text: JSON.stringify(req.body),
        //     html:
        //     `
        //      <h3> ${emailTitle} </h3>
        //      <div>Name: ${firstname || ""} ${lastname || ""}</div>
        //      <div>Company: ${company || ""}</div>
        //      <div>Position: ${job || ""}</div>
        //      <div>Email: ${email}</div>
        //      <div>Product: ${product || ""}</div>
        //      <div>Stage of Development: ${stage || ""}</div>
        //      <div>Areas of Interest: ${aois || ""}</div>
        //      <div>Additional: ${more || ""}</div>
        //     `
        // };

        // const transporter = nodemailer.createTransport({
        //     host: 'smtp.mailgun.org',
        //     port: 587,
        //     auth: {
        //         user: mailOptions.from,
        //         pass: process.env.SUPPORT_PASS
        //     }
        // });

        // transporter.sendMail(mailOptions, (e, info) => {
        //     if (e) {
        //         console.log(`Sending the email ${emailTitle} to ${mailOptions.from} failed.`, e);
        //         res.status(500).send(JSON.stringify({msg: "Form submission failed! Try Again.."}));
        //         return false;
        //     }
        //     console.log(`Sending the email [${emailTitle}] to [${mailOptions.from}] succeeded.`);
        //     res.status(200).send(JSON.stringify({ msg: "Thank you for submitting the support form! A member of our team will be in touch shortly." }));
        // });
    }
);

export default router;