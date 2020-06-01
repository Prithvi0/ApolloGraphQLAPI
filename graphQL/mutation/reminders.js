/** It modifies stored user notes data & returns a reminder value relating to notes.
 * It can be used to perform CRUD operations.
 * Mutations are defined as a part of the schema.
 */

// Module imports
const notesModel = require('../../model/note');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

/** It is used to create reminder on noteId.
 * @sync
 * @param {String, String} args, context       - args for reminder, context for authorization (generated token).
 * @constructor                                - parent is required.
 * @returns {Error}                            - if User Validations are false based on the input.
 * @returns {String, Boolean} message, success - true (Note saved), else false.
 */
exports.createReminder = async (parent, args, context) => {
    let userAuthorization = jwt.verify(context.authorization, secret);
    console.log(context.authorization)
    if (!userAuthorization) {
        throw new Error("Invalid user token authentication")
    }
    if (!args.reminder) {
        throw new Error('Reminder can\'t be empty');
    }
    const newNote = new notesModel({
        title: args.title,
        description: args.description,
        userId: userAuthorization.id,
        reminder: args.reminder
    });

    // save note
    const saveNote = await newNote.save();
    if (saveNote) {
        return {
            message: 'Reminder created!',
            success: true
        };
    } else {
        return {
            message: 'Reminder not created!',
            success: false
        };
    }
}

/** It is used to set a reminder on noteId.
 * @sync
 * @param {String} args                        - args for reminder by using noteId,
 *                                               context for authorization (generated token).
 * @returns {Error}                            - if User Validations are false based on the input.
 * @returns {String, Boolean} message, success - true (Reminder set to note), else false.
 */
exports.setReminder = async (parent, args, context) => {
    let userNote = await notesModel.find(args.noteId)
    if (!userNote) {
        throw new Error('No such note id.')
    }
    let reminder = await notesModel.update({ reminder: args.reminder })
    if (reminder) {
        return {
            message: 'Reminder has been set.',
            success: true
        };
    } else {
        return {
            message: 'Reminder not set.',
            success: false
        };
    }
}