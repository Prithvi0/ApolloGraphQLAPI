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
    title: {
        type: String,
        minlength: 1,
        maxlength: 25
    },
    description: {
        type: String,
        minlength: 1,
        maxlength: 30
    },
},
    {
        timestamps: true
    });

module.exports = mongoose.model('Collab', CollabSchema);