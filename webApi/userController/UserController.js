const UserModels = require('../../models/User');

function PostUser (req, res) {
    const { name, emailAddress, phoneNumber, image } = req.body;
    const userDTO = new UserModels.UserDTO(name, emailAddress, phoneNumber, image);
    res.send(userDTO);
}

module.exports = { PostUser };