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

module.exports = new UserLogic();