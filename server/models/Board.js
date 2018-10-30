let mongoose = require('mongoose');
let uniqueValidator = require('mongoose-unique-validator');
let List = require('./List');

let Schema = mongoose.Schema;

let boardSchema = new Schema({
        name: {
            required  : true,
            minlength : 3,
            type      : String
        },
        creator: {
            required  : true,
            type      : Schema.Types.ObjectId
        },
        color: {
            required  : true,
            minlength : 3,
            type      : String,
            match     : [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Please, provide a color code in #000000 format']
        },
        lists: {
            required  : true,
            type      : [List],
            default   : []
        }
    },
    {
        versionKey: false
    });

//boardSchema.plugin(uniqueValidator);

let Board = mongoose.model('Board', boardSchema);

module.exports = Board;
