let mongoose = require('mongoose');
let crypto = require('../config/crypto');

let Schema = mongoose.Schema;

let userSchema = new Schema({
    id: String,
    username: String,
    firstName: String,
    lastName: String,
    email: String,
    hash: String,
    salt: String
});

/**
 * method to valid the password given
 * @param password the password given
 * @returns {boolean} true if the password is valid, false if the password isn't valid
 */
userSchema.methods.validPassword = function(password) {
    let payloads = crypto.sha512(password, this.salt);
    return payloads.passwordHash === this.hash;
};

/**
 * method to set the password
 * @param oldPassword the old password
 * @param newPassword the new password
 * @returns {boolean} true if the password is modified, false if the password can't be modified
 */
userSchema.methods.setPassword = function(oldPassword, newPassword) {
    if(validPassword(oldPassword)) {
        this.salt = crypto.getSalt();
        this.hash = crypto.sha512(newPassword, this.salt).passwordHash;
        return true
    }
    return false
};

let User = mongoose.model('User', userSchema);

module.exports = User;
