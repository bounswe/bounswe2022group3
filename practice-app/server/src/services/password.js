const crypto = require("crypto");

function encryptPassword(password, salt) {
    return crypto.pbkdf2Sync(password, salt, iterations=10000, keylen=512, 'sha512').toString('hex');
}

function checkPassword(password, hashedPassword, salt) {
    return encryptPassword(password, salt) === hashedPassword;
}

module.exports = {
    encryptPassword,
    checkPassword
}