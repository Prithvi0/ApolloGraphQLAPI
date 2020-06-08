/** It modifies stored GitHub user data & returns a value related to the user.
 * It can be used to perform CRUD operations.
 * Mutations are defined as a part of the schema.
 */

// Module imports
const clientId = process.env.CLIENT_ID;
const axios = require('axios');
const clientSecret = process.env.CLIENT_SECRET;
const userModel = require('../../model/user');
// const access_token = process.env.ACCESS_TOKEN;
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

/** It is used to return user code associated with the GitHub.
 * @function (githubLoginUrl)
 * @returns - user login authorization for GitHub.
 */
exports.githubLoginUrl = () => {
    let githubLoginUrl = 'https://github.com/login/oauth/authorize?client_id=' + clientId + '&scope=user';
    return githubLoginUrl;
}

/** It is used to request a GitHub access token with credentials.
 * The credentials are sent to a GitHub API URL in the body of a POST request.
 * The credentials consist of the client_id, client_secret, and code.
 * Once completed, the GitHub response is then parsed.
 * @function (requestGithubToken)
 * @constructor                 - parent is required.
 * @param {String} args         - args for code (get GitHub access token).
 * @param {String} tokenRequest - to access information from the GitHub user's account.
 */
exports.requestGithubToken = async (parent, args, context) => {
    let tokenRequest = 'https://github.com/login/oauth/access_token?client_id=' + clientId + '&client_secret=' + clientSecret + `&code=${args.code}`;
    let post = await axios.post(tokenRequest)
    if (!post) {
        return {
            message: 'No Access token generated',
            success: false,
            token: error
        };
    } else {
        return {
            message: 'Access token for login has been generated',
            success: true,
            token: post.data
        };
    }
}

exports.githubDetails = async (parent, args, context) => {
    let accessToken = await axios.get('https://api.github.com/user?access_token=' + args.accessToken);
    console.log(accessToken);
    let getGithubEmail = await userModel.findOne({ emailId: accessToken.data.emailId });
    if (!getGithubEmail) {
        throw new Error('No such e-mail found for GitHub.');
    }
    let updateUser = await getGithubEmail.updateOne({ gitId: accessToken.data.id, gitUserName: accessToken.data.login, accessToken: args.accessToken })
    if (!updateUser) {
        throw new Error('Invalid user info');
    } return {
        message: "GitHub user info has been updated.",
        success: true
    }
}

exports.githubRepoDetails = async (parent, args, context) => {
    let userAuthorization = jwt.verify(context.authorization, secret);
    if (!userAuthorization) {
        throw new Error("Invalid user token authentication")
    }
    let user = await userModel.findOne({ emailId: userAuthorization.emailId });
    if (!user) {
        throw new Error('Invalid password reset link')
    }
    let accessToken = 'https://api.github.com/user?access_token=' + args.accessToken;
    let userRepo = await axios.get(accessToken)
    if (userRepo) {
        const newNote = new notesModel({
            title: 'title',
            description: 'description',
            userId: user._id
        });
        // save note
        const saveNote = await newNote.save();
        if (saveNote) {
            return {
                message: 'Note created!',
                success: true
            };
        } else {
            return {
                message: 'Note not created!',
                success: false
            };
        }
    }
}