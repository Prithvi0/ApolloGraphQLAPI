/** It serves the database using the port defined under the `.env`
 * @method
 * @param {port} message
 */

// Module imports
require('./config/databaseConfig');
require('dotenv').config();
const port = process.env.PORT || 4000;
const axios = require('axios');
const gitHubUser = process.env.GITHUB_USER;

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

// requesting data from the GitHub API
axios.get(gitHubUser)
    .then((response) => {
        console.log(response.data);
        console.log(response.status);
        console.log(response.statusText);
        console.log(response.headers);
        console.log(response.config);
    });

// The `listen` method launches a web server
server.listen(port, err => {
    if (err)
        throw new Error(err);
    console.log(`🚀 Server ready at ${port}`);
});