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

# This "Note" type defines the queryable fields for every notes in the data source.
type Note {
    id: ID!
    title : String!
    Description : String!
    userId: ID!
}

# This "Label" type defines the queryable fields for every labels in the data source.
type Label {
    id: ID!
    labelName: String!
    userId: ID!
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
    allNotes: [Note!]!
    notesByUserId(userId: ID!): Note!
    allLabels: [Label!]!
    labelsByUserId(userId: ID!): Label!
}

# It registers all of the available queries that clients can
# execute, along with the return type for each (from Response defined above)
type Mutation {
    register(firstName: String!, lastName: String!, emailId: String!, password: String!): Response
    login(emailId: String!, password: String!): Response
    forgotPass(emailId: String!): Response
    resetPass(newPass: String!, confirmPass: String!): Response
    createNote(title: String!, description: String!): Response
    updateNote(id: ID!, title: String!, description: String!): Response
    deleteNote(id: ID!): Response
    createLabel(labelName: String!): Response
    updateLabel(id: ID!, title: String!): Response
    deleteLabel(id: ID!): Response
}`