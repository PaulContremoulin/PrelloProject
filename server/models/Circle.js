let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let arrayUniquePlugin = require('mongoose-unique-array');

let circleSchema = new Schema({
        name : {
            type : String,
            required : true
        },
        idMember : {
            type : mongoose.Types.ObjectId,
            ref : 'Member',
            required : true
        },
        idBoards: [{
            type : Schema.Types.ObjectId,
            ref : 'Board'
        }]
    },
    {
        versionKey: false
    });

circleSchema.plugin(arrayUniquePlugin);
//circleSchema.plugin(idValidator);
/**
 * Add a new circle
 * @param idBoard, the board'id to add
 */
circleSchema.methods.addBoard = function(idBoard){
    this.idMembers.push(idBoard);
};

let Circle = mongoose.model('Circle', circleSchema);
module.exports = Circle;