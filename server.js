const port = process.env.PORT || 4000;

const { ApolloServer } = require('apollo-server');

module.exports = server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server
server.listen(port, err => {
  if (err)
    throw new Error(err);
  console.log(`🚀 Server ready at ${port}`);
});