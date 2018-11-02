let mongoose = require('mongoose');
let crypto = require('../config/crypto');
var uniqueValidator = require('mongoose-unique-validator');
let mongooseHidden = require('mongoose-hidden')()

let Schema = mongoose.Schema;

let memberSchema = new Schema({
    username: {
        required  : true,
        unique   : true,
        minlength : 3,
        type      : String
    },
    bio: {
        type      : String
    },
    firstName: {
        minlength : 3,
        type      : String
    },
    lastName: {
        required  : true,
        minlength : 3,
        type      : String
    },
    organization: {
        required  : false,
        type      : String
    },
    idBoards: {
        type : [Schema.Types.ObjectId],
        default : [],
        required : true
    },
    idOrganizations: {
        type : [Schema.Types.ObjectId],
        default : [],
        required : true
    },
    email: {
        type: String,
        trim: true,
        index: true,
        unique: true,
        sparse: true,
        match    : [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    confirmed : {
        required : true,
        type : Boolean,
        default : false
    },
    loginType: {
        type: String,
        enum: ['password', 'both', 'saml'],
        required : true
    },
    hash: String,
    salt: String,
    oauth: {
        github : String
    },
},
{
    versionKey: false
});

memberSchema.plugin(uniqueValidator);
memberSchema.plugin(mongooseHidden, { hidden: { hash: true, salt: true, oauth: true, _id: false } })

memberSchema.pre('validate', function(next) {
    if (!this.oauth.github) {
        if(!this.hash && !this.salt) return next(new Error('Member must have a password or a authentication with OAuth protocol.'));
        if(!this.email) return next(new Error('Email is required.'));
    }
    return next();
});

/**
 * give the user's fullName
 * @returns {string} the user fullName
 */
memberSchema.methods.fullName = function() {
    return this.lastName + ' ' + this.firstName;
};

/**
 * method to valid the password given
 * @param password the password given
 * @returns {boolean} true if the password is valid, false if the password isn't valid
 */
memberSchema.methods.validPassword = function(password) {
    let payloads = crypto.sha512(password, this.salt);
    return payloads.passwordHash === this.hash;
};


/**
 * method to set the password
 * @param oldPassword the old user's password
 * @param newPassword the new user's password
 * @returns {boolean} true if the password is modified successfully, false if the password can't be modified (old password wrong)
 */
memberSchema.methods.setPassword = function(oldPassword, newPassword) {
    if(validPassword(oldPassword)) {
        this.salt = crypto.getSalt();
        this.hash = crypto.sha512(newPassword, this.salt).passwordHash;
        return true
    }
    return false
};

/**
 * Json object that describe the user's payload
 * @returns {Object|*|Array|Binary} a JSON with user's payload information
 */
memberSchema.methods.payload = function() {
    return {
        _id : this._id,
        confirmed : this.confirmed
    };
}


let Member = mongoose.model('Member', memberSchema);

module.exports = Member;
