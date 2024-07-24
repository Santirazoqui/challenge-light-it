const Sequelize = require('sequelize');
const sequelize = require('../sequelize');
const DataTypes = Sequelize.DataTypes;

const User = sequelize.define('User', {
    name: { type: DataTypes.STRING, allowNull: false},
    emailAddress: { type: DataTypes.STRING, allowNull: false},
    phoneNumber: { type: DataTypes.STRING, allowNull: false},
    image: { type: DataTypes.STRING, allowNull: false}
});

class UserDTO {
    constructor(name, emailAddress, phoneNumber, image) {
        this.name = name;
        this.emailAddress = emailAddress;
        this.phoneNumber = phoneNumber;
        this.image = image;
    }
}

module.exports = { UserDTO, User };