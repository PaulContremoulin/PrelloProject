let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let checkItemSchema = new Schema({
        name: {
            type : String,
            required : true,
            minlength : 1,
            maxlength : 100
        },
        idChecklist: {
            type: mongoose.Types.ObjectId,
            ref: 'Checklist',
            required : true
        },
        state: {
            type : String,
            required : true,
            default : 'incomplete',
            enum: ['incomplete', 'completed']
        },
        pos: {
            type : Number,
            required : true
        }
    },
    {
        toJSON: { virtuals: true },
        versionKey : false
    });

let CheckItem = mongoose.model('CheckItem', checkItemSchema);

module.exports = CheckItem;
