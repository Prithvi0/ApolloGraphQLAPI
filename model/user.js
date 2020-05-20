/** It defines mongodb schema model for the user.
 * @constructor
 * @property {object} userName  -   The value type & required field.
 * @property {object} emailId   -   The value type & required field.
 * @property {object} password  -   The value type & required field.
 * @property {object} timestamps -  The time user registered or logged in.
 */

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