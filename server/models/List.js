let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let listSchema = new Schema({
        name: {
            required  : true,
            minlength : 3,
            type      : String
        },
        closed : {
            required  : true,
            type      : Boolean,
            default   : false
        },
        idBoard : {
            required  : true,
            type      : Schema.Types.ObjectId
        },
        pos : {
            required  : true,
            type      : Number
        }
    },
    {
        versionKey: false
    });

//boardSchema.plugin(uniqueValidator);

let List = mongoose.model('List', listSchema);

module.exports = List;