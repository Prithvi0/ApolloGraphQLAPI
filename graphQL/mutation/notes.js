/** It modifies stored user notes data & returns a value relating to notes.
 * It can be used to perform CRUD operations.
 * Mutations are defined as a part of the schema.
 */

// Module imports
const notesModel = require('../../model/note');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

/** It is used to create Notes on userId.
 * @sync
 * @param {String, String} args, context       - args for notes, context for authorization (generated token).
 * @constructor                                - parent is required.
 * @returns {Error}                            - if User Validations are false based on the input.
 * @returns {String, Boolean} message, success - true (Note saved), else false.
 */
 exports.createNote = async (parent, args, context) => {
    let userAuthorization = jwt.verify(context.authorization, secret);
    console.log(context.authorization);
    if (!userAuthorization) {
        throw new Error('Invalid user token authentication')
    }
    if (!args.description) {
        throw new Error('Description can\'t be empty');
    }
    const newNote = new notesModel({
        title: args.title,
        description: args.description,
        userId: userAuthorization.id
    });

    // save note
    const saveNote = await newNote.save();
    if (saveNote) {
        return {
            message: 'Note created!',
            success: true
        };
    } else {
        return {
            message: 'Note not created!',
            success: false
        };
    }
}

/** It is used to edit and update the created Notes on userId.
 * @sync
 * @param {String} args                        - args for notes.
 * @constructor                                - parent is required.
 * @returns {String, Boolean} message, success - true (find by user id & update), else false.
 */
exports.updateNote = async (parent, args, context) => {
    let userNote = await notesModel.findByIdAndUpdate(args.id, {
        title: args.title,
        description: args.description
    }, { new: true })
    if (userNote) {
        return {
            message: 'User note has been updated.',
            success: true
        }
    } else {
        return {
            message: 'User Id not found. Unable to update.',
            success: false
        }
    }
}

/** It is used to delete the created Notes on userId.
 * @sync
 * @param {String} args         - args for notes.
 * @constructor                 - parent is required.
 * @returns {} message, success - if true (find by user id & delete), else false.
 */
exports.deleteNote = async (parent, args, context) => {
    let userNote = await notesModel.findByIdAndDelete(args.id)
    if (userNote) {
        return {
            message: 'User note has been deleted.',
            success: true
        }
    } else {
        return {
            message: 'User id not found. Unable to delete.',
            success: false
        }
    }
}

/** It is used to archive the created Notes on userId.
 * @sync
 * @param {String} args                        - args for notes.
 * @constructor                                - parent is required.
 * @returns {String, Boolean} message, success - if true (find by user id & update) for archive note.
 *                                               , else false.
 */
exports.archiveNote = async (parent, args, context) => {
    let userNote = await notesModel.findOneAndUpdate(args._id, { archive: true }, { new: true })
    if (userNote) {
        return {
            message: 'User note has been archived.',
            success: true
        }
    } else {
        return {
            message: 'Note Id not found. Unable to archive.',
            success: false
        }
    }
}

/** It is used to unarchive the created Notes on userId.
 * @sync
 * @param {String} args                        - args for notes.
 * @constructor                                - parent is required.
 * @returns {String, Boolean} message, success - if true (find by user id & update) for unarchive note.
 *                                               , else false.
 */
exports.unArchiveNote = async (parent, args, context) => {
    let userNote = await notesModel.findOneAndUpdate(args._id, { archive: false }, { new: true })
    if (userNote) {
        return {
            message: 'User note has been unarchived.',
            success: true
        }
    } else {
        return {
            message: 'Note Id not found. Unable to unarchive.',
            success: false
        }
    }
}

/** It is used to trash the created Notes on userId.
 * @sync
 * @param {String} args                        - args for notes.
 * @constructor                                - parent is required.
 * @returns {String, Boolean} message, success - if true (find by user id & update) for trash note.
 *                                               , else false.
 */
exports.trashNote = async (parent, args, context) => {
    let userNote = await notesModel.findOneAndUpdate(args._id, { trash: true }, { new: true })
    if (userNote) {
        return {
            message: 'User note has been moved to trash.',
            success: true
        }
    } else {
        return {
            message: 'Note Id not found. Unable to trash.',
            success: false
        }
    }
}

/** It is used to untrash the created Notes on userId.
 * @sync
 * @param {String} args                        - args for notes.
 * @constructor                                - parent is required.
 * @returns {String, Boolean} message, success - if true (find by user id & update) for untrash note.
 *                                               , else false.
 */
exports.unTrashNote = async (parent, args, context) => {
    let userNote = await notesModel.findOneAndUpdate(args._id, { trash: false }, { new: true })
    if (userNote) {
        return {
            message: 'User note has been removed from trash.',
            success: true
        }
    } else {
        return {
            message: 'NoteId not found. Unable to untrash.',
            success: false
        }
    }
}