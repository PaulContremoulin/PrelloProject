let mongoose = require('mongoose');

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
        versionKey: false
    });

cardSchema.methods.createOrUpdateMember = function(memberId) {
    if(!this.idMembers.find( mId => mId.equals(memberId))) this.idMembers.push(memberId);
};

let Card = mongoose.model('Card', cardSchema);

module.exports = Card;