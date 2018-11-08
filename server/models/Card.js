let mongoose = require('mongoose');
let idValidator = require('mongoose-id-validator');

let Schema = mongoose.Schema;

let cardSchema = new Schema({
        name: String,
        desc: String,
        pos: {
            type : Number,
            required : true,
        },
        due :  Date,
        dueComplete : {
            default : false,
            type: Boolean
        },
        idList : {
            type: mongoose.Schema.ObjectId,
            ref : 'List',
            required : true
        },
        idBoard : {
            required  : true,
            type      : Schema.Types.ObjectId,
            ref : 'Board'
        },
        idMembers : {
            type : [{
                type : mongoose.Schema.ObjectId,
                ref : 'Member'
            }],
            default : []
        },
        closed : {
            type : Boolean,
            required : true,
            default : false
        }
    },
    {
        toJSON: { virtuals: true },
        versionKey: false
    });

cardSchema.plugin(idValidator);

cardSchema.virtual('checklists', {
    ref: 'Checklist', // The model to use
    localField: '_id', // Find people where `localField`
    foreignField: 'idCard' // is equal to `foreignField`
});


cardSchema.methods.createOrUpdateMember = function(memberId) {
    if(!this.idMembers.find( mId => mId.equals(memberId))) this.idMembers.push(memberId);
};

let Card = mongoose.model('Card', cardSchema);

module.exports = Card;