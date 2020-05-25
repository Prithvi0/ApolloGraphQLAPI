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
    firstName: {
        type: String,
        required: [true, 'first name required'],
        minlength: 3,
        maxlength: 10
    },
    lastName: {
        type: String,
        required: [false, 'expected 3-10 characters'],
        minlength: 3,
        maxlength: 10
    },
    emailId: {
        type: String,
        required: [true, 'e-mail required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password required'],
        minlength: 8,
    },
},
    {
        timestamps: true
    });

module.exports = mongoose.model('User', userSchema);