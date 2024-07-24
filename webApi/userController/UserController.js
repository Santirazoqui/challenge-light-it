const UserModels = require('../../models/User');
const userLogic = require('../../businessLogic/UserLogic');

function PostUser (req, res) {
    const { name, emailAddress, phoneNumber, image } = req.body;
    const userDTO = new UserModels.UserDTO(name, emailAddress, phoneNumber, image);
    userLogic.RegisterUser(userDTO);
    res.send(userDTO);
}

module.exports = { PostUser };