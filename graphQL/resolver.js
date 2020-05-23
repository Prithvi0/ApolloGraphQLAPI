/** It defines the technique for fetching the types defined in the schema.
 * This resolver retrieves details from the user.
 * @property {object} Query     -   Returns Welcome message.
 * @property {object} Mutation  -   Returns stored data and a specific value.
 */

const message = require('../graphQL/query').message;
const register = require('../graphQL/mutation/users').register;
const login = require('../graphQL/mutation/users').login;

// resolvers
exports.resolvers = {
    Query: {
        message
    },

    Mutation: {
        register,
        login
    }
}