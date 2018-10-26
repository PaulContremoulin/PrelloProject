let mongoose = require('mongoose');
let crypto = require('../config/crypto');
var uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let userSchema = new Schema({
    username: {
        required  : true,
        unique   : true,
        minlength : 3,
        type      : String
    },
    firstName: {
        required  : true,
        minlength : 3,
        type      : String
    },
    lastName: {
        required  : true,
        minlength : 3,
        type      : String
    },
    email: {
        required : true,
        unique   : true,
        type     : String,
        match    : [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    hash: {
        type : String,
        select : true
    },
    salt: {
        type : String,
        select : true
    }
},
{
    versionKey: false
});

userSchema.plugin(uniqueValidator);

/**
 * give the user's fullName
 * @returns {string} the user fullName
 */
userSchema.methods.fullName = function() {
    return this.lastName + ' ' + this.firstName;
};

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

userSchema.methods.toJSON = function() {
    var json = this.toObject();
    delete json.salt;
    delete json.hash;
    delete json._id;
    return json;
}

let User = mongoose.model('User', userSchema);

module.exports = User;
