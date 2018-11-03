let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');
let List = require('./List');
let Membership = require('./Memberships')

let Schema = mongoose.Schema;

let boardSchema = new Schema({
        name: {
            required  : true,
            minlength : 3,
            type      : String
        },
        idOrganization : {
            type      : Schema.Types.ObjectId,
            default   : null
        },
        desc: {
            required  : false,
            type      : String
        },
        closed : {
                required : true,
                type : Boolean,
                default : false
        },
        memberships: {
            required  : true,
            type      : [Membership],
            default   : []
        },
        prefs: {
            background : {
                required  : true,
                default   : "#FFFFFF",
                type      : String,
                match     : [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Please, provide a color code in hexa format (#000000).']
            }
        },
        labelNames: {
            green : {
                type : String,
                default : ""
            },
            yellow : {
                type : String,
                default : ""
            },
            orange : {
                type : String,
                default : ""
            },
            red : {
                type : String,
                default : ""
            },
            purple : {
                type : String,
                default : ""
            },
            blue : {
                type : String,
                default : ""
            },
            sky : {
                type : String,
                default : ""
            },
            lime : {
                type : String,
                default : ""
            },
            pink : {
                type : String,
                default : ""
            },
            black : {
                type : String,
                default : ""
            }
        }
    },
    {
        versionKey: false
    });

boardSchema.methods.getMemberRole = function(memberId, next){
    this.memberships.findById(memberId, (err, member) => {
        if(err) next(err, null);
        if(!member) next(null, null);
        return next(null, member.memberType);
    });
};

boardSchema.methods.addMember = function(idMember, memberType, unconfirmed) {
    this.memberships.push({
        idMember: idMember,
        memberType: memberType,
        unconfirmed: unconfirmed
    });
};


//boardSchema.plugin(uniqueValidator);

let Board = mongoose.model('Board', boardSchema);

module.exports = Board;
