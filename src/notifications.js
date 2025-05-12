const nodemailer = require("nodemailer");
require('dotenv').config();

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
        console.log('✅ There is now an appointment available: https://service.berlin.de/dienstleistung/351180/');
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
        console.log('📧 Email sent successfully!');
    } catch (err) {
        console.error('⚠️ Error sending email:', err);
        console.log('✅ There is now an appointment available: https://service.berlin.de/dienstleistung/351180/');
    }
}

module.exports = {sendNotification};