const redis = require('redis');
const nodemailer = require('nodemailer');

async function EmailNotification(){
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

function SendMail(user){
    const transporter = nodemailer.createTransport({
        host: 'sandbox.smtp.mailtrap.io',
        port: 587,
        secure: false,
        auth: {
            user: '72ac2ad1e5e12e',
            pass: 'a78d3399912c3e',
        }
    });

    const mailOptions = {
        from: 'irazoqui.santi@outlook.com',
        to: `${user.emailAddress}`,
        subject: 'User registration confirmed',
        text: `User ${user.name} has been registered successfully!`
    };

    transporter.sendMail(mailOptions, function(error, info){
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