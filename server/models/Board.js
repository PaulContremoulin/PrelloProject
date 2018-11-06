let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');
let List = require('./List');
let Membership = require('./Memberships')
let idValidator = require('mongoose-id-validator');

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

boardSchema.plugin(idValidator);

/**
 * get the member if the member belongs at the board's team
 * @param memberId, the member id to test
 * @returns a member if exist or null
*/
boardSchema.methods.getMember = function(memberId){
    return this.memberships.find( m => m.idMember.equals(memberId));
};

/**
 * Check if the user is a normal user
 * @param memberId
 * @returns {a|boolean}
 */
boardSchema.methods.isNormalMember = function(memberId){
    let member = this.getMember(memberId);
    return member && member.isNormal();
};

/**
 * Check if the user is a admin user
 * @param memberId
 * @returns {a|boolean}
 */
boardSchema.methods.isAdminMember = function(memberId){
    let member = this.getMember(memberId);
    return member && member.isAdmin();
};

/**
 * Check if the user is a admin user
 * @param memberId
 * @returns {a|boolean}
 */
boardSchema.methods.isObserverMember = function(memberId){
    let member = this.getMember(memberId);
    return member && member.isObserver();
};


/**
 * Add a member to the board
 * @param idMember, the member id to add
 * @param memberType, the role assigned
 * @param unconfirmed, the  invitation confirmation
 */
boardSchema.methods.createOrUpdateMember = function(idMember, memberType) {
    let member = this.memberships.find( m => m.idMember.equals(idMember));
    if(member) {
        member.memberType = memberType;
    }else{
        this.memberships.push({
            idMember: idMember,
            memberType: memberType,
            unconfirmed: true
        });
    }
};

/**
 * Add a member to the board
 * @param idMember, the member id to add
 * @param memberType, the role assigned
 * @param unconfirmed, the  invitation confirmation
 */
boardSchema.methods.nbAdmin = function() {
    return this.memberships.filter( m => m.memberType === 'admin').length;
};


//boardSchema.plugin(uniqueValidator);

let Board = mongoose.model('Board', boardSchema);

module.exports = Board;
