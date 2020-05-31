const mongoose = require('mongoose')
    , Schema = mongoose.Schema

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