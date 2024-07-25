const LightItClientErrors = require('../lightItErrors/LightItClientErrors');
const UserRepository = require('../dataAccess/UserRepository');
const Buffer = require('buffer').Buffer;
const fs = require('fs');
require('dotenv').config();
const redis = require('redis');

class UserLogic {
    async RegisterUser(userDTO) {
        try {
            validateUser(userDTO);
            const userExists = await UserRepository.GetUserByField('emailAddress', userDTO.emailAddress);
            if (userExists)
                throw new LightItClientErrors.ForbiddenError('User already exists');

            const imageDir = saveImageAsFile(userDTO.image, userDTO.emailAddress);
            userDTO.image = imageDir;

            const userCreated = await UserRepository.SaveUser(userDTO);

            await NotifyUser(userCreated);
            
            return userCreated;
        } catch (error) {
            throw error;
        }
    }
}

function validateUser(userDTO) {
    valideUserName(userDTO.name);
    validateEmail(userDTO.emailAddress);
    validatePhoneNumber(userDTO.phoneNumber);
    if (!userDTO.image)
        throw new LightItClientErrors.BadRequestError('Image is required');

}

const ValidateUserNameRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
function valideUserName(name) {
    if (!name)
        throw new LightItClientErrors.BadRequestError('Name is required');
    if (name.length < 3)
        throw new LightItClientErrors.BadRequestError('Name is too short, minium 3 characters');
    if (!ValidateUserNameRegex.test(name))
        throw new LightItClientErrors.BadRequestError('Name is invalid, no special characters allowed');
}

const validateEmailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function validateEmail(email) {
    if (!email)
        throw new LightItClientErrors.BadRequestError('Email is required');
    if (!validateEmailRegex.test(email))
        throw new LightItClientErrors.BadRequestError('Email is invalid');
}

const validatePhoneNumberRegex = /^\d{9}$/;
function validatePhoneNumber(phoneNumber) {
    if (!phoneNumber)
        throw new LightItClientErrors.BadRequestError('Phone number is required');
    if (!validatePhoneNumberRegex.test(phoneNumber))
        throw new LightItClientErrors.BadRequestError('Phone number is invalid, must be 9 digits, no spaces or special characters');
}

function saveImageAsFile(base64Image, emailAddress){
    const buffer = Buffer.from(base64Image, 'base64');
    const imageDir = `${process.env.PatientImagesDirectory}/${emailAddress}.png`;
    fs.writeFileSync(imageDir, buffer);
    return imageDir;
}

async function NotifyUser(user) {
    const redisClient = redis.createClient().on("error", (error) => { throw new Error(error) });
    await redisClient.connect();
    await redisClient.publish("User_Created", JSON.stringify(user));
    await redisClient.disconnect();
}

module.exports = new UserLogic();