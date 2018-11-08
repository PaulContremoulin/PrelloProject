let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let checkItemSchema = new Schema({
        name: String,
        idChecklist: {
            type: mongoose.Types.ObjectId,
            ref: 'Checklist'
        },
        state: {
            type : String,
            required : true,
            default : 'incomplete',
            match : ['incomplete', 'completed']
        },
        pos: {
            type : Number,
            required : true
        }
    },
    {
        versionKey : false
    });

let CheckItem = mongoose.model('CheckItem', checkItemSchema);

module.exports = CheckItem;
