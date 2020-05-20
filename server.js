require('./config/databaseConfig');
require('dotenv').config();
const port = process.env.PORT || 4000;

const { ApolloServer } = require('apollo-server');

// The ApolloServer constructor with parameters: schema definition & set of resolvers
module.exports = server = new ApolloServer({ typeDefs, resolvers });

// The listen method launches a web server
server.listen(port, err => {
  if (err)
    throw new Error(err);
  console.log(`🚀 Server ready at ${port}`);
});