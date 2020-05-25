/** It serves the database using the port defined under the `.env`
 * @method
 * @param {port} message
 */

require('./config/databaseConfig');
require('dotenv').config();
const port = process.env.PORT || 4000;

const { ApolloServer } = require('apollo-server');
const { typeDefs } = require('./graphQL/schema');

const resolvers = require('./graphQL/resolver').resolvers;

// const getAllUsers = require('./graphQL/query').getAllUsers;

// The ApolloServer constructor with parameters: schema definition & set of resolvers
module.exports = server = new ApolloServer({
    typeDefs, resolvers,
    context: ({ req }) => ({
//         const token = req.query.token || '';

//    // retrieve a user with the token
//    const user = getAllUsers(token);

//    if (!user) throw new AuthenticationError('you must be logged in'); 

//    // add the user to the context
//    return { user };
//     }
token: req.query.token
    })
});

// The `listen` method launches a web server
server.listen(port, err => {
    if (err)
        throw new Error(err);
    console.log(`🚀 Server ready at ${port}`);
});