let mongoose = require('mongoose');
let Schema = mongoose.Schema;
require('./../models/CheckItem');

let checklistSchema = new Schema({
        name: {
            type : String,
            required : true,
            minlength : 1,
            maxlength : 100
        },
        idBoard: {
            type: mongoose.Types.ObjectId,
            ref: 'Board',
            required : true
        },
        idCard: {
            type: mongoose.Types.ObjectId,
            ref: 'Card',
            required : true
        },
        pos: {
            type: Number,
            required: true
        }
    },
    {
        toJSON: { virtuals: true },
        versionKey: false
    });

checklistSchema.virtual('checkItems', {
    ref: 'CheckItem', // The model to use
    localField: '_id', // Find people where `localField`
    foreignField: 'idChecklist' // is equal to `foreignField`
});

let Checklist = mongoose.model('Checklist', checklistSchema);

module.exports = Checklist;
