const { gql } = require('apollo-server');

exports.typeDefs = gql`
# This "User" type defines the queryable fields for every user in the data source.
type User {
    id : ID!
    userName : String!
    emailId : String!
    password : String!
}

type Auth {
    message : String!
    success : Boolean!
}

type Query {
    message : String!
}

# It registers all of the available queries that clients can
# execute, along with the return type for each (from Auth defined above)
type Mutation {
    register(userName: String!, emailId: String!, password: String!): Auth
}`