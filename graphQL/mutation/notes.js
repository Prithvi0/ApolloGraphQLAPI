const notesModel = require('../../model/note');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

exports.createNote = async (parent, args, context) => {
    let userAuthorization = jwt.verify(context.authorization, secret);
    console.log(context.authorization)
    if (!userAuthorization) {
        throw new Error("Invalid user token authentication")
    }
    if (!args.description) {
        throw new Error('Description can\'t be empty');
    }
    const newNote = new notesModel({
        title: args.title,
        description: args.description,
        userId: userAuthorization.userId
    });

    // save note
    const saveNote = await newNote.save();
    if (saveNote) {
        return {
            message: 'Note created!',
            success: 'true'
        };
    } else {
        return {
            message: 'Note not created!',
            success: 'false'
        };
    }
}

exports.updateNote = async (parent, args, context) => {
    let userNote = await notesModel.findByIdAndUpdate(args.userId, {
        title: args.title,
        description: args.description
    }, { new: true })
    if (userNote) {
        return {
            message: 'User note has been updated.',
            success: 'true'
        }
    } else {
        return {
            message: 'User Id not found. Unable to update.',
            success: 'false'
        }
    }
}

exports.deleteNote = async(parent, args, context) => {
    let userNote = await notesModel.findByIdAndDelete(args.userId)
    if (userNote) {
        return {
            message: 'User note has been deleted.',
            success: 'true'
        }
    } else {
        return {
            message: 'User id not found. Unable to delete.',
            success: 'false'
        }
    }
}