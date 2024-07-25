const redis = require('redis');
const nodemailer = require('nodemailer');
require('dotenv').config();

async function EmailNotification() {
    try {
        const redisClient = redis.createClient().on("error", (error) => { throw new Error(error) });
        const emailNotificationClient = redisClient.duplicate();
        await emailNotificationClient.connect();
        emailNotificationClient.subscribe("User_Created", async (message) => {
            const user = JSON.parse(message);
            console.log(`Sending email to ${user.emailAddress}`);

            SendMail(user);

            console.log("\n");
        });
    } catch (error) {
        console.log(error)
    }
}

function SendMail(user) {
    const transporter = nodemailer.createTransport({
        host: process.env.MailtrapHost,
        port: 587,
        secure: false,
        auth: {
            user: process.env.MailtrapUser,
            pass: process.env.MailtrapPassword,
        }
    });

    const mailOptions = {
        from: 'realmail@outlook.com',
        to: `${user.emailAddress}`,
        subject: 'User registration confirmed',
        text: `User ${user.name} has been registered successfully!`
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log('Error:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
}

(async () => {
    EmailNotification();
})();