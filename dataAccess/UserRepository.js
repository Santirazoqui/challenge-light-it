const sequelize = require('sequelize');
const UserModels = require('../models/User');

class UserRepository {
    async SaveUser(userDTO) {
        const userCreated = await UserModels.User.create({
            name: userDTO.name,
            emailAddress: userDTO.emailAddress,
            phoneNumber: userDTO.phoneNumber,
            image: userDTO.image
        });

        return userCreated;
    }
}

module.exports = new UserRepository();