let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let arrayUniquePlugin = require('mongoose-unique-array');


let circleSchema = new Schema({
        name : {
            type : String,
            required : true,
            minlength : 1,
            maxlength : 100
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
        toJSON: { virtuals: true },
        versionKey: false
    });

circleSchema.plugin(arrayUniquePlugin);

//circleSchema.plugin(idValidator);

/**
 * Add a board
 * @param idBoard, the board'id to add
 */
circleSchema.methods.addBoard = function(idBoard){
    this.idBoards.push(idBoard);
};

/**
 * Remove a board
 * @param idBoard, the board'id to remove
 */
circleSchema.methods.removeBoard = function(idBoard){
    this.idBoards.remove(idBoard);
};

let Circle = mongoose.model('Circle', circleSchema);
module.exports = Circle;