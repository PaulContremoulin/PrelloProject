let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let membershipSchema = new Schema({
        idMember: {
            required  : true,
            type      : Schema.Types.ObjectId
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
            default : false
        }
    },
    {
        versionKey: false
    });

module.exports = membershipSchema