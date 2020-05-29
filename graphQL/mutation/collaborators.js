const collabModel = require('../../model/collaborator')
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

exports.createCollab = async (parent, args, context) => {
    let userAuthorization = jwt.verify(context.authorization, secret);
    if (!userAuthorization) {
        throw new Error('Invalid user token authentication')
    }
    let collab = await collabModel.find({
        userId: args.collabId
    });
    if (!collab) {
        throw new Error('No such user Id found')
    }
    const newNote = new collabModel({
        userId: userAuthorization.id,
        collabId: args.collabId
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