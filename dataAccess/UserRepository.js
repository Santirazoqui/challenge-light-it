const sequelize = require('sequelize');
const UserModels = require('../models/User');

class UserRepository {
    async CreateUser(userDTO) {
        const userCreated = await UserModels.User.create({
            name: userDTO.name,
            emailAddress: userDTO.emailAddress,
            phoneNumber: userDTO.phoneNumber,
            image: userDTO.image
        });

        return userCreated;
    }

    async GetUserByField(fieldName, fieldValue) {
        const user = await UserModels.User.findOne({
            where: {
                [fieldName]: fieldValue
            }
        });
        return user;
    }
}

module.exports = new UserRepository();