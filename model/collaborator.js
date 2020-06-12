/** It defines mongodb schema model for the collaborator.
 * @constructor
 * @property {object} userId     - The value type & `User` Schema reference.
 * @property {object} collabId   - The value type & `User` Schema reference.
 * @property {object} noteId     - The value type & `Note` Schema reference.
 * @property {object} timestamps - The time user registered or logged in.
 */

// Module imports
const mongoose = require('mongoose')
    , Schema = mongoose.Schema;

// defining mongodb schema for collaborator
const CollabSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    collabId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    noteId: {
        type: Schema.Types.ObjectId,
        ref: 'Note'
    }
},
{
    timestamps: true
});

module.exports = mongoose.model('Collab', CollabSchema);