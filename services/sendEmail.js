const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv');
const { SENDGRID_API_KEY } = process.env;

dotenv.config();
sgMail.setApiKey(SENDGRID_API_KEY);


const sendEmail = async (data) => {
    const email = { ...data, from: "maxgoitstudy@gmail.com" };
    try {
        await sgMail.send(email);
        return true;
    } catch (error) {
        return error;
    }
}

module.exports = sendEmail;