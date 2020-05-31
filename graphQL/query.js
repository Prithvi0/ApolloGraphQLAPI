const userModel = require('../model/user');
const notesModel = require('../model/note');
const labelsModel = require('../model/label');
const collabsModel = require('../model/collaborator');

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

exports.getCollabsByUserId = (parent, args) => {
    return collabsModel.findById(args.userId).exec();
}

exports.getArchiveNotes = () => {
    return notesModel.find({ archive: true }).exec();
}

exports.getTrashNotes = () => {
    return notesModel.find({ trash: true }).exec();
}

exports.getReminders = (parent, args) => {
    return notesModel.find(args.reminder).exec();
}