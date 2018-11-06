let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let membershipSchema = new Schema({
        idMember: {
            required  : true,
            type      : Schema.Types.ObjectId,
            ref : 'Member'
        },
        memberType: {
            type: String,
            enum: ['normal', 'admin', 'observer'],
            required : true,
            default : ['observer']
        },
        unconfirmed: {
            required: true,
            type: Boolean,
            default : true
        }
    },
    {
        versionKey: false
    });

/**
 * Check if the user is admin
 * @returns {boolean} true if admin or false else
 */
membershipSchema.methods.isAdmin = function(){
    return this.memberType === 'admin';
};

/**
 * Check if the user is normal user
 * @returns {boolean} true if normal or false else
 */
membershipSchema.methods.isNormal = function(){
    return this.memberType === 'normal';
};

/**
 * Check if the user is observer user
 * @returns {boolean} true if observer or false else
 */
membershipSchema.methods.isObserver = function(){
    return this.memberType === 'observer';
};

module.exports = membershipSchema;