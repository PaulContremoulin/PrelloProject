let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let checklistSchema = new Schema({
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
