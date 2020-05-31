const notesModel = require('../../model/note');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

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

exports.putReminder = async (parent, args, context) => {
    let userNote = await notesModel.find(args.noteId)
    if (!userNote) {
        throw new Error('No such note id.')
    }
    let reminder = await notesModel.update({ reminder: args.reminder })
    if (reminder) {
        return {
            message: 'Reminder has been put.',
            success: true
        };
    } else {
        return {
            message: 'Reminder not put.',
            success: false
        };
    }
}