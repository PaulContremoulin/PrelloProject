let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let checklist = new Schema({
    name: String,
    idBoard: {
        type: mongoose.Types.ObjectId,
        ref: 'Board'
    },
    idCard: {
        type: mongoose.Types.ObjectId,
        ref: 'Card'
    },
    pos: {
        type: Number,
        required: true
    }
},
    {
        versionKey: false
    });