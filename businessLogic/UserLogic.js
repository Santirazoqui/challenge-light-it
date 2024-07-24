const LightItClientErrors = require('../lightItErrors/LightItClientErrors');

class UserLogic {
    RegisterUser(userDTO) {
        try {
            validateUser(userDTO);
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

const ValidateUserRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
function valideUserName(name) {
    if (!name)
        throw new LightItClientErrors.BadRequestError('Name is required');
    if (name.length < 3)
        throw new LightItClientErrors.BadRequestError('Name is too short, minium 3 characters');
    if (!ValidateUserRegex.test(name))
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
    if (!validatePhoneNumberRegex.test(email))
        throw new LightItClientErrors.BadRequestError('Phone number is invalid, must be 9 digits, no spaces or special characters');
}

module.exports = new UserLogic();