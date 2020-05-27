const mongoose = require('mongoose')
    , Schema = mongoose.Schema

const NoteSchema = new Schema({
    title: {
        type: String,
        required: [true, 'title required'],
        minlength: 1,
        maxlength: 25
    },
    description: {
        type: String,
        required: [true, 'description required'],
        minlength: 1,
        maxlength: 30
    },
    userId: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Note', NoteSchema);