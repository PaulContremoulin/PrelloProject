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
            maxlength : 100,
            type      : String
        },
        desc: {
            required  : false,
            type      : String,
            maxlength : 1000,
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
        toJSON: { virtuals: true },
        versionKey: false
    });

boardSchema.plugin(idValidator);


boardSchema.virtual('labels', {
    ref: 'Label', // The model to use
    localField: '_id', // Find people where `localField`
    foreignField: 'idBoard' // is equal to `foreignField`
});

/**
 * get the member if the member belongs at the board's team
 * @param memberId, the member id to test
 * @returns a member if exist or null
*/
boardSchema.methods.getMember = function(memberId){
    return this.memberships.find( m => m.idMember.equals(memberId));
};

/**
 * get the member if the member belongs at the board's team
 * @param memberId, the member id to test
 * @returns a member if exist or null
 */
boardSchema.methods.getMemberOfShip = function(memberId){
    return this.memberships.id(memberId);
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
 * @return the member added
 */
boardSchema.methods.createOrUpdateMember = function(idMember, memberType) {
    let member = this.memberships.find( m => m.idMember.equals(idMember));
    if(member) {
        member.memberType = memberType;
        return member;
    }else{
        member = {
            idMember: idMember,
            memberType: memberType,
            unconfirmed: true
        };
        this.memberships.push(member)
        return this.memberships[this.memberships.length-1]
    }
};

/**
 * Get the number of admin on the board
 * @return number the number of admin
 */
boardSchema.methods.nbAdmin = function() {
    return this.memberships.filter( m => m.memberType === 'admin').length;
};

/**
 * Get admins of the board
 * @return an array of the admin members
 */
boardSchema.methods.getAdmins = function() {
    return this.memberships.filter( m => m.memberType === 'admin');
};

/**
 * Remove a user
 * @param memberId, the id of user to remove
 * @callback the next function to perform
 * @return err if error occurred
 */
boardSchema.methods.removeMember = function(idMember, next) {
    let member = this.memberships.pull(idMember)
    if(!member) return next(true);
    this.model('Member').update(
        { id: member[0].idMember},
        { $pull: { idBoards :  this._id } },
        { multi: true },
        next(null));
};


//boardSchema.plugin(uniqueValidator);

let Board = mongoose.model('Board', boardSchema);

module.exports = Board;
