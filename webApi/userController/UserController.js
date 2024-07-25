const UserModels = require('../../models/User');
const userLogic = require('../../businessLogic/UserLogic');

async function  PostUser (req, res) {
    const { name, emailAddress, phoneNumber, image } = req.body;
    const userDTO = new UserModels.UserDTO(name, emailAddress, phoneNumber, image);
    const userCreated = await userLogic.RegisterUser(userDTO);
    res.status(201).send(userCreated);
}

module.exports = { PostUser };