let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let listSchema = new Schema({
        name: {
            required  : true,
            minlength : 3,
            type      : String
        },
        color: {
            required  : false,
            type      : String
        }
    },
    {
        versionKey: false
    });

module.exports = listSchema;