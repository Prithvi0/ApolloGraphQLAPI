const mongoose = require('mongoose');
const schema = mongoose.Schema;

// defining mongodb schema
const userSchema = new schema({
    userName: {
        type: String,
        require: true,
    },

    emailId: {
        type: String,
        require: true
    },

    password: {
        type: String,
        require: true
    },
},
    {
        timestamps: true
    });

module.exports = mongoose.model('User', userSchema);