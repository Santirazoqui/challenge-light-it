class UserDTO {
    constructor(name, emailAddress, phoneNumber, image) {
        this.name = name;
        this.emailAddress = emailAddress;
        this.phoneNumber = phoneNumber;
        this.image = image;
    }
}

module.exports = { UserDTO };