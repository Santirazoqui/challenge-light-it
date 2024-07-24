class UserLogic {
    RegisterUser(userDTO) {
        try {
            validateUser(userDTO);
            
        } catch (error) {
            console.log(error);
        }
    }
}

function validateUser(userDTO) {
    valideUserName(userDTO.name);
}

const ValidateUserRegex = /^[A-Za-z]+(?: [A-Za-z]+)*$/;
function valideUserName(name) {
    if (!name) throw new Error('Name is required');
    if (name.length < 3) throw new Error('Name is too short, minium 3 characters');
    if (!ValidateUserRegex.test(name)) throw new Error('Name is invalid, no special characters allowed');
}

module.exports = new UserLogic();