let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let idValidator = require('mongoose-id-validator');


let labelSchema = new Schema({
        name : {
            type : String,
            required : true
        },
        color : {
            type : String,
            required : true,
            match     : [/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Please, provide a color code in hexa format (#000000).']
        },
        idBoard: {
            type : mongoose.Types.ObjectId,
            ref : 'Board',
            required : true
        }
    },
    {
        toJSON: { virtuals: true },
        versionKey: false
    });

labelSchema.plugin(idValidator);

let Label = mongoose.model('Label', labelSchema);
module.exports = Label;