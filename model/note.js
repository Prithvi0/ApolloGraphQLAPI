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
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    archive: {
        type: Boolean,
        default: false
    },
    trash: {
        type: Boolean,
        default: false
    },
    reminder: {
        type: Date,
        default: [new Date().getTime() + 1, 'Remind time should be more than current time']
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Note', NoteSchema);