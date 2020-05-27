const userModel = require('../model/user');
const notesModel = require('../model/notesModel/note');
const labelsModel = require('../model/notesModel/label');

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

exports.getNotesByUserId = (parent, args) => {
    return notesModel.findById(args.userId).exec();
}

exports.getAllNotes = () => {
    return notesModel.find().exec();
}

exports.getLabelsByUserId = (parent, args) => {
    return labelsModel.findById(args.userId).exec();
}

exports.getAllLabels = () => {
    return labelsModel.find().exec();
}