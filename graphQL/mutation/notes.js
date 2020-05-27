const notesModel = require('../../model/notesModel/note');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

// validate description
if (!args.description) {
    throw new Error('Description can\'t be empty');
}

exports.createNote = async (parent, args, context) => {
    let userAuthorization = jwt.verify(context.authorization, secret);
    if (!userAuthorization) {
        throw new Error("Invalid user token authentication")
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
            success: 'true'
        };
    } else {
        return {
            message: 'Note not created!',
            success: 'false'
        };
    }
}

exports.retrieveNote = async (parent, args, context) => {
    let user = await notesModel.findOne({
        userId: args.userId
    });
    if (args.userId === user.userId) {
        let token = jwt.sign(
            {
                userId: user.userId
            }, secret, { expiresIn: "12d" });
        return {
            message: 'Note found',
            success: 'true',
            token: token
        }
    }
    return {
        message: 'Invalid ID. Note not found',
        success: 'false',
        token: 'invalid'
    }
}

exports.updateNote = async (parent, args, context) => {
    let userNote = await notesModel.findByIdAndUpdate(args.id, {
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
    let userNote = await notesModel.findByIdAndDelete(args.id)
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