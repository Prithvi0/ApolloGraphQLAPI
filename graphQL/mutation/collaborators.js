/** It modifies stored user collaborator data & returns a value related to collaborator.
 * It can be used to perform CRUD operations.
 * Mutations are defined as a part of the schema.
 */

// Module imports
const collabModel = require('../../model/collaborator')
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

/** It is used to create Notes on Collaborator Id.
 * @sync
 * @param {String, String} args, context       - args for Collaborator, context for authorization (generated token).
 * @constructor                                - parent is required.
 * @returns {Error}                            - if Collaborator validations are false based on the input.
 * @returns {String, Boolean} message, success - true (Note saved), else false.
 */
exports.createCollab = async (parent, args, context) => {
    let userAuthorization = jwt.verify(context.authorization, secret);
    console.log(context.authorization);
    if (!userAuthorization) {
        throw new Error('Invalid user token authentication')
    }
    let userNote = collabModel.findById(args.noteId);
    let collab = await userNote.updateOne({
        collabId: args.collabId
    });
    if (!collab) {
        throw new Error('No such collab Id found')
    }
    const newNote = new collabModel({
        userId: userAuthorization.id,
        collabId: args.collabId,
        noteId: args.noteId
    });

    // save note
    const saveNote = await newNote.save();
    if (saveNote) {
        return {
            message: 'Collaborator created!',
            success: true
        };
    } else {
        return {
            message: 'Collaborator not created!',
            success: false
        };
    }
}

/** It is used to delete the created Notes on Collaborator Id.
 * @sync
 * @param {String} args                        - args for notes.
 * @constructor                                - parent is required.
 * @returns {String, Boolean} message, success - if true (find by Note id & delete), else false.
 */
exports.deleteCollab = (parent, args, context) => {
    let userAuthorization = jwt.verify(context.authorization, secret);
    if (!userAuthorization) {
        throw new Error('Invalid user token authentication')
    }
    let userNote = collabModel.findByIdAndDelete({ _id: args.noteId })
    if (userNote) {
        return {
            message: 'Collaborator note has been deleted.',
            success: true
        }
    } else {
        return {
            message: 'Collaborator id not found. Unable to delete.',
            success: false
        }
    }
}