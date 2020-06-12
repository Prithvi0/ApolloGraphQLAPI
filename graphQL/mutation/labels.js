/** It modifies stored user label data & returns a value relating to notes label.
 * It can be used to perform CRUD operations.
 * Mutations are defined as a part of the schema.
 */

// Module imports
const labelsModel = require('../../model/label');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

/** It is used to create labels on userId.
 * @sync
 * @param {String, String} args, context       - args for labels, context for authorization (generated token).
 * @constructor                                - parent is required.
 * @returns {Error}                            - if User Validations are false based on the input.
 * @returns {String, Boolean} message, success - true (Label saved), else false.
 */
exports.createLabel = async (parent, args, context) => {
    let userAuthorization = jwt.verify(context.authorization, secret);
    if (!userAuthorization) {
        throw new Error('Invalid user token authentication');
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
};

/** It is used to edit and update the created Labels on userId.
 * @sync
 * @param {String} args                        - args for labels.
 * @constructor                                - parent is required.
 * @returns {String, Boolean} message, success - true (find by user id & update), else false.
 */
exports.updateLabel = async (parent, args) => {
    let userLabel = await labelsModel.findByIdAndUpdate(args.id, {
        labelName: args.labelName,
    }, { new: true });
    if (userLabel) {
        return {
            message: 'User label has been updated.',
            success: true
        };
    } else {
        return {
            message: 'User Id not found. Unable to update.',
            success: false
        };
    }
};

/** It is used to delete the created Labels on userId.
 * @sync
 * @param {String} args         - args for labels.
 * @constructor                 - parent is required.
 * @returns {} message, success - if true (find by user id & delete), else false.
 */
exports.deleteLabel = async(parent, args) => {
    let userLabel = await labelsModel.findByIdAndDelete(args.id);
    if (userLabel) {
        return {
            message: 'User label has been deleted.',
            success: true
        };
    } else {
        return {
            message: 'User id not found. Unable to delete.',
            success: false
        };
    }
};