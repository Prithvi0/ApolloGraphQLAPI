const labelsModel = require('../../model/notesModel/label');
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
    const newLabel = new labelsModel({
        labelName: args.labelName,
        userId: userAuthorization.id
    });

    // save label
    const saveLabel = await newLabel.save();
    if (saveLabel) {
        return {
            message: 'Label created!',
            success: 'true'
        };
    } else {
        return {
            message: 'Label not created!',
            success: 'false'
        };
    }
}

exports.retrieveLabel = async (parent, args, context) => {
    let user = await labelsModel.findOne({
        userId: args.userId
    });
    if (args.userId === user.userId) {
        let token = jwt.sign(
            {
                userId: user.userId
            }, secret, { expiresIn: "12d" });
        return {
            message: 'Label found',
            success: 'true',
            token: token
        }
    }
    return {
        message: 'Invalid ID. Label not found',
        success: 'false',
        token: 'invalid'
    }
}

exports.updateLabel = async (parent, args, context) => {
    let userLabel = await labelsModel.findByIdAndUpdate(args.userId, {
        labelName: args.labelName,
    }, { new: true })
    if (userLabel) {
        return {
            message: 'User label has been updated.',
            success: 'true'
        }
    } else {
        return {
            message: 'User Id not found. Unable to update.',
            success: 'false'
        }
    }
}

exports.deleteLabel = async(parent, args, context) => {
    let userLabel = await labelsModel.findByIdAndDelete(args.userId)
    if (userLabel) {
        return {
            message: 'User label has been deleted.',
            success: 'true'
        }
    } else {
        return {
            message: 'User id not found. Unable to delete.',
            success: 'false'
        }
    }
}