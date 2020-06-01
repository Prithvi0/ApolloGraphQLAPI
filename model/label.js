/** It defines mongodb schema model for the user.
 * @constructor
 * @property {object} labelName   - The String type & required field with a message, min & max chars allowed.
 * @property {object} userId      - The value type & `User` Schema reference.
 * @property {object} timestamps  - The time user registered or logged in.
 */

// Module imports
const mongoose = require('mongoose')
    , Schema = mongoose.Schema

// defining mongodb schema for label
const LabelSchema = new Schema({
    labelName: {
        type: String,
        required: [true, 'label name required'],
        minlength: 1,
        maxlength: 15
    },
    userId: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Label', LabelSchema);