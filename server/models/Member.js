let mongoose = require('mongoose');
let crypto = require('../config/crypto');
let jwt = require('jsonwebtoken');
let shortid = require('shortid');
let uniqueValidator = require('mongoose-unique-validator');
let mongooseHidden = require('mongoose-hidden')()
let idValidator = require('mongoose-id-validator');

let Schema = mongoose.Schema;
let circlesSchema = require('./Circle');

let memberSchema = new Schema({
    username: {
        required  : true,
        unique   : true,
        minlength : 3,
        maxlength : 30,
        type      : String
    },
    bio: {
        type      : String,
        maxlength : 3000,
    },
    firstName: {
        minlength : 3,
        maxlength : 50,
        type      : String
    },
    lastName: {
        required  : true,
        minlength : 3,
        maxlength : 50,
        type      : String
    },
    organization: {
        required  : false,
        maxlength : 50,
        type      : String
    },
    idBoards: {
        type : [
            {
                type : Schema.Types.ObjectId,
                ref : 'Board'
            }
        ],
        default : [],
        required : true
    },
    organization : {
        type : String,
        maxlength : 50
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
        maxlength : 100,
        match    : [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    confirmed : {
        required : true,
        type : Boolean,
        default : false
    },
    tokenConfirm : {
        type : String,
        default : shortid.generate()
    },
    loginType: {
        type: String,
        enum: ['password', 'both', 'saml'],
        required : true
    },
    hash: {
        type : String
    },
    salt: {
        type : String
    },
    resetPass : {
        token : String,
        expire : Date
    },
    oauth: {
        github : String
    }
},
{
    toJSON: { virtuals: true },
    versionKey: false
});

memberSchema.plugin(uniqueValidator);
memberSchema.plugin(idValidator);
memberSchema.plugin(mongooseHidden,
    { hidden:
            {
                hash: true,
                salt: true,
                oauth: true,
                resetPass: true,
                tokenConfirm: true,
                _id: false
            }
    });

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
 * method to generate a json web token
 * @returns {String} a generate json web token
 */
memberSchema.methods.generateJWT = function() {
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: this.payload()
    }, process.env.JWT_SECRET);
};


/**
 * method to generate a reset password token
 * @returns {String} a generate reset password token
 */
memberSchema.methods.generateResetPasswordToken = function() {
    this.resetPass = {
        expire : Math.floor(Date.now() / 1000) + (60 * 60),
        token : shortid.generate()
    };
    return this.resetPass.token;
};

/**
 * method to set the password
 * @param newPassword the new user's password
 * @returns {boolean} true if the password is modified successfully, false if the password can't be modified (old password wrong)
 */
memberSchema.methods.setPassword = function(password) {
    if(!password.match(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/)) return false
    this.salt = crypto.getSalt();
    this.hash = crypto.sha512(password, this.salt).passwordHash;
    return true
};

memberSchema.methods.passwordTokenExpired = function(){
    return !this.resetPass || !this.resetPass.token || this.resetPass.expire < Math.floor(Date.now() / 1000)
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
};


let Member = mongoose.model('Member', memberSchema);

module.exports = Member;
