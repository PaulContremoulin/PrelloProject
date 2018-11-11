let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let commentSchema = new Schema({
        text: {
            type : String,
            required : true,
            minlength : 1
        },
        idAuthor: {
            type: mongoose.Types.ObjectId,
            ref: 'Member',
            required : true
        },
        date: {
            type: Date,
            required : true,
            default : Date.now()
        },
        idCard: {
            type: mongoose.Types.ObjectId,
            ref: 'Card',
            required : true
        }
    },
    {
        toJSON: { virtuals: true },
        versionKey: false
    });

let Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;
