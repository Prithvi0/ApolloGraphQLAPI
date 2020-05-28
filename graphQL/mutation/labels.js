const labelsModel = require('../../model/label');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

exports.createLabel = async (parent, args, context) => {
    let userAuthorization = jwt.verify(context.authorization, secret);
    if (!userAuthorization) {
        throw new Error("Invalid user token authentication")
    }
    if (!args.labelName) {
        throw new Error('Label name can\'t be empty');
    }
    let newLabel = new labelsModel({
        labelName: args.labelName,
        userId: userAuthorization.id
    });

    // save label
    let saveLabel = await newLabel.save();
    if (saveLabel) {
        return {
            message: 'Label created!',
            success: true
        };
    } else {
        return {
            message: 'Label not created!',
            success: false
        };
    }
}

exports.updateLabel = async (parent, args, context) => {
    let userLabel = await labelsModel.findByIdAndUpdate(args.id, {
        labelName: args.labelName,
    }, { new: true })
    if (userLabel) {
        return {
            message: 'User label has been updated.',
            success: true
        }
    } else {
        return {
            message: 'User Id not found. Unable to update.',
            success: false
        }
    }
}

exports.deleteLabel = async(parent, args, context) => {
    let userLabel = await labelsModel.findByIdAndDelete(args.id)
    if (userLabel) {
        return {
            message: 'User label has been deleted.',
            success: true
        }
    } else {
        return {
            message: 'User id not found. Unable to delete.',
            success: false
        }
    }
}