/** It is a collection of type definitions (typeDefs) that together
 * defines the shape of queries executed against the user data.
 * @property {string} gql   -   Defines the queryable fields for every user.
 */

const { gql } = require('apollo-server');

exports.typeDefs = gql`
# This "User" type defines the queryable fields for every user in the data source.
type User {
    id : ID!
    firstName : String!
    lastName : String!
    emailId : String!
    password : String!
}

type Response {
    message : String!
    success : Boolean!
    token: String!
}

type Query {
    message : String!
    allUsers: [User!]!
    userById(id: ID!): User!
}

# It registers all of the available queries that clients can
# execute, along with the return type for each (from Response defined above)
type Mutation {
    register(firstName: String!, lastName: String!, emailId: String!, password: String!): Response
    login(emailId: String!, password: String!): Response
    forgotPass(emailId: String!): Response
    resetPass(newPass: String!, confirmPass: String!): Response
}`