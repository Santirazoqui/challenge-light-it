const redis = require('redis');

try {
    const redisClient = redis.createClient().on("error", (error) => { throw new Error(error) });
    const emailNotificationClient = redisClient.duplicate();
    await emailNotificationClient.connect();
    emailNotificationClient.subscribe("User_Created", async (message) => {
        const user = JSON.parse(message);
        console.log(`Sending email to ${user.emailAddress}`);
        
        console.log(`Email sent to ${user.emailAddress}`);
        console.log("\n");
    });
} catch (error) {
    console.log(error)
}