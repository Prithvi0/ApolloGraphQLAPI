const collabModel = require('../../model/collaborator')
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

exports.createCollab = async (parent, args, context) => {
    let userAuthorization = jwt.verify(context.authorization, secret);
    console.log(context.authorization);
    if (!userAuthorization) {
        throw new Error('Invalid user token authentication')
    }
    let collab = await collabModel.updateOne({
        collabId: args.collabId
    });
    if (!collab) {
        throw new Error('No such user Id found')
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

exports.deleteCollab = async (parent, args, context) => {
    let userAuthorization = jwt.verify(context.authorization, secret);
    if (!userAuthorization) {
        throw new Error('Invalid user token authentication')
    }
    let userNote = await userAuthorization.findByIdAndDelete({ _id: args.noteId })
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