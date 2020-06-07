/** It defines mongodb schema model for the note.
 * @constructor
 * @property {object} title       - The String type & required field with a message.
 * @property {object} description - The String type & required field with a message.
 * @property {object} userId      - The value type, required field with a message & unique.
 * @property {object} archive     - The Boolean type & default set to false to avoid archiving at start.
 * @property {object} trash       - The Boolean type & default set to false to avoid trashing at start.
 * @property {object} reminder    - The Date type & min set to more than the current date.
 * @property {object} timestamps  - The time user registered or logged in.
 */

// Module imports
const mongoose = require('mongoose')
    , Schema = mongoose.Schema

// defining mongodb schema for notes
const NoteSchema = new Schema({
    title: {
        type: String,
        required: [true, 'title required'],
    },
    description: {
        type: String,
        required: [true, 'description required'],
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    Label: {
        type: Schema.Types.ObjectId,
        ref: 'Label'
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
        min: [new Date().getTime() + 1, 'Remind time should be more than current time']
    }
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Note', NoteSchema);