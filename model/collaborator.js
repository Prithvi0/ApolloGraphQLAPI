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
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Collab', CollabSchema);