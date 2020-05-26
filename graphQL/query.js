const userModel = require('../model/user');

/** It returns a Welcome message for the user.
 * @function
 * @returns -   Welcome message
 */
exports.message = () => {
    return 'Welcome User!';
}

/** It returns a user using Id.
 * @function
 * @returns -   users by Id
 */
exports.getUserById = (parent, args) => {
    return userModel.findById(args.id).exec();
}

/** It returns all users.
 * @function
 * @returns -   all users
 */
exports.getAllUsers = () => {
    return userModel.find().exec();
}
return new Error('There might be a connection error. Retry again.');