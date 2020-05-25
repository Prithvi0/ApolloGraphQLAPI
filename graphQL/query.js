/** It returns a Welcome message for the user.
 * @function
 * @returns -   Welcome message
 */

const userModel = require('../model/user');

exports.message = () => {
    return 'Welcome User!';
}

exports.getAllUsers = () => {
    return userModel.find().exec();
}
return new Error('There might be a connection error. Retry again.');