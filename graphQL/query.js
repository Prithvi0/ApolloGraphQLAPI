/** It is used to request and fetch the specific data.
 * Queries are the foundation of GraphQL, where QL stands for `Query Language`.
 */

// Module imports
const userModel = require('../model/user');
const notesModel = require('../model/note');
const labelsModel = require('../model/label');
const collabsModel = require('../model/collaborator');

/** It returns a Welcome message for the user.
 * @function (message)
 * @returns -   Welcome message.
 */
exports.message = () => {
    return 'Welcome User!';
};

/** It returns a user using Id.
 * @function (getUserById)
 * @constructor -   parent is required.
 * @param {String} args.id
 * @returns     -   users by Id.
 */
exports.getUserById = (parent, args) => {
    return userModel.findById(args.id).exec();
};

/** It returns all users.
 * @function (getAllUsers)
 * @returns -   all users.
 */
exports.getAllUsers = () => {
    return userModel.find().exec();
};

/** It returns notes on userId.
 * @function (getNotesByUserId)
 * @constructor -   parent is required.
 * @param {String} args.userId  
 * @returns     -   notes by userId.
 */
exports.getNotesByUserId = (parent, args) => {
    return notesModel.findById(args.userId).exec();
};

/** It returns all notes.
 * @function (getAllNotes)
 * @returns -   all notes.
 */
exports.getAllNotes = () => {
    return notesModel.find({ archive: { $ne: true }, trash: { $ne: true } }).populate('Note').exec();
};

/** It returns labels on userId.
 * @function (getLabelsByUserId)
 * @constructor -   parent is required.
 * @returns     -   labels by userId.
 */
exports.getLabelsByUserId = (parent, args) => {
    return labelsModel.findById(args.userId).exec();
};

/** It returns all labels.
 * @function (getAllLabels)
 * @returns -   all labels
 */
exports.getAllLabels = () => {
    return labelsModel.find().exec();
};

/** It returns collabs on userId.
 * @function (getCollabsByUserId)
 * @constructor -   parent is required.
 * @returns     -   collabs on userId.
 */
exports.getCollabsByUserId = (parent, args) => {
    return collabsModel.findById(args.userId).exec();
};

/** It returns all archived notes.
 * @function (getArchiveNotes)
 * @returns -   all archived notes.
 */
exports.getArchiveNotes = () => {
    return notesModel.find({ archive: true }).exec();
};

/** It returns all trashed notes.
 * @function (getTrashNotes)
 * @returns -   all trashed notes.
 */
exports.getTrashNotes = () => {
    return notesModel.find({ trash: true }).exec();
};

/** It returns all reminders.
 * @function (getReminders)
 * @constructor -   parent is required.
 * @returns     -   all reminders.
 */
exports.getReminders = (parent, args) => {
    return notesModel.find(args.reminder).exec();
};