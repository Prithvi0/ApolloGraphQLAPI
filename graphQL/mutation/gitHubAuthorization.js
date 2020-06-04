/** It modifies stored GitHub user data & returns a value related to the user.
 * It can be used to perform CRUD operations.
 * Mutations are defined as a part of the schema.
 */

/** It is used to return user code associated with the GitHub.
 * @function (githubLoginUrl)
 * @returns - user login authorization for GitHub.
 */
exports.githubLoginUrl = () => {
    return `${process.env.LOGIN_AUTH}${process.env.CLIENT_ID}&scope=user`
}