let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let cardSchema = new Schema({
        name: {
            required: true,
            minlength: 3,
            type: String
        },
        index: {
            required: true,
            minlength: 3,
            type: String
        }
    },
    {
        versionKey: false
    });

module.exports = cardSchema;