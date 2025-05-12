const nodemailer = require("nodemailer");
require('dotenv').config();
const {logWithTimestamp} = require("./utils");

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    tls: {
        rejectUnauthorized: false // Disable SSL certificate validation
    },
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD // Use an app password if 2FA is enabled
    }
});

async function sendNotification() {
    if (process.env.EMAIL_USERNAME === 'example@test.com') {
        logWithTimestamp('✅ There is now an appointment available: https://service.berlin.de/dienstleistung/351180/');
        return;
    }

    const mailOptions = {
        from: process.env.EMAIL_USERNAME,
        to: process.env.SEND_TO_EMAIL, // or another recipient
        subject: '📅 Berlin Einbürgerungstest – Appointment Available!',
        text: 'There is now an appointment available: https://service.berlin.de/dienstleistung/351180/'
    };

    try {
        await transporter.sendMail(mailOptions);
        logWithTimestamp('📧 Email sent successfully!');
    } catch (err) {
        logWithTimestamp('⚠️ Error sending email:', err);
        logWithTimestamp('✅ There is now an appointment available: https://service.berlin.de/dienstleistung/351180/');
    }
}

module.exports = {sendNotification};