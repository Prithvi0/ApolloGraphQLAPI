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

// The ApolloServer constructor with parameters: schema definition & set of resolvers
module.exports = server = new ApolloServer({
    typeDefs, resolvers,
    context: ({ req }) => ({
        authorization: req.headers.authorization
    })
});

// The `listen` method launches a web server
server.listen(port, err => {
    if (err)
        throw new Error(err);
    console.log(`🚀 Server ready at ${port}`);
});