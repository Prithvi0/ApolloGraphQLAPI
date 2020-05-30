const collabModel = require('../../model/collaborator')
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

exports.createCollab = async (parent, args, context) => {
    let userAuthorization = jwt.verify(context.authorization, secret);
    if (!userAuthorization) {
        throw new Error('Invalid user token authentication')
    }
    let collab = await collabModel.find({
        userId: args.noteId
    });
    if (!collab) {
        throw new Error('No such user Id found')
    }
    const newNote = new collabModel({
        userId: userAuthorization.id,
        collabId: args.collabId,
        title: args.title,
        description: args.description
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
    let userNote = await collabModel.findByIdAndDelete({ id: args.noteId })
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