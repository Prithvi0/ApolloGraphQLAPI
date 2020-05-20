const message = require('../graphQL/query').message;
const register = require('../graphQL/mutation/users').register;

// resolvers
exports.resolvers = {
    Query: {
        message
    },

    Mutation: {
        register
    }
}