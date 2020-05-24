/** It is a collection of type definitions (typeDefs) that together
 * defines the shape of queries executed against the user data.
 * @property {string} gql   -   Defines the queryable fields for every user.
 */

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
    token: String!
}

type Query {
    message : String!
}

# It registers all of the available queries that clients can
# execute, along with the return type for each (from Auth defined above)
type Mutation {
    register(userName: String!, emailId: String!, password: String!): Auth
    login(emailId: String!, password: String!): Auth
    forgotPass(emailId: String!): Auth
}`