const mongoose = require('mongoose')
    , Schema = mongoose.Schema

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