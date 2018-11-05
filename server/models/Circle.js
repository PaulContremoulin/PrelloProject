let mongoose = require('mongoose');

let Schema = mongoose.Schema;
let idValidator = require('mongoose-id-validator');

let circleSchema = new Schema({
        name : {
            type : String,
            required : true
        },
        idBoards: {
            type : [{
                type : Schema.Types.ObjectId,
                required : true,
                ref : 'Board'
            }],
            default : []
        }
    },
    {
        versionKey: false
    });

circleSchema.plugin(idValidator);
module.exports = circleSchema;