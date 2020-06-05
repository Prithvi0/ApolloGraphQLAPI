/** It modifies stored GitHub user data & returns a value related to the user.
 * It can be used to perform CRUD operations.
 * Mutations are defined as a part of the schema.
 */

// Module imports
const clientId = process.env.CLIENT_ID;
const axios = require('axios');
const clientSecret = process.env.CLIENT_SECRET;

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
exports.requestGithubToken = (parent, args, context) => {
    let tokenRequest = 'https://github.com/login/oauth/access_token?client_id=' + clientId + '&client_secret=' + clientSecret + `&code=${args.code}`;
    let post = axios.post(tokenRequest)
        .then(tokenRequest => {
            console.log(tokenRequest)
            if (post) {
                return ({
                    message: 'Access token for login has been generated',
                    success: true,
                    token: tokenRequest
                });
            }
        }).catch(error => {
            throw new Error({
                message: 'No Access token generated',
                success: false,
                token: error
            });
        })
}