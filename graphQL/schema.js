/** It is a collection of type definitions (typeDefs) that together
 * defines the shape of queries executed against the user data.
 * @property {string} gql   -   Defines the queryable fields for every user.
 */

const { gql } = require('apollo-server');

exports.typeDefs = gql`
# A way to specify custom scalar type in GraphQL service implementations
scalar Date

# This "User" type defines the queryable fields for every user in the data source.
type User {
    id : ID!
    firstName : String!
    lastName : String!
    emailId : String!
    password : String!
    gitId: String!
    gitUserName: String!
    accessToken: String!
}

# This "Note" type defines the queryable fields for every notes in the data source.
type Note {
    id: ID!
    title : String!
    description : String!
    userId: String!
}

# This "Collab" type defines the queryable fields for every note collabs in the data source.
type Collab {
    id: ID!
    userId: String!
    collabId: String!
    noteId: String!
}

# This "Label" type defines the queryable fields for every labels in the data source.
type Label {
    id: ID!
    labelName: String!
    userId: String!
}

# It defines parameters to get after a mutation is provided.
type Response {
    message : String!
    success : Boolean!
    token: String!
}

# It lists all available queries that clients can execute along with return type.
type Query {
    message : String!
    allUsers: [User!]!
    userById(id: String!): User!
    allNotes: [Note!]!
    notesByUserId(userId: String!): Note!
    allLabels: [Label!]!
    labelsByUserId(userId: String!): Label!
    collabsByUserId(userId: String!): Collab!
    getArchiveNotes: [Note!]!
    getTrashNotes: [Note!]!
    getReminders: [Note!]!
}

# It registers all of the available queries that clients can
# execute, along with the return type for each (from Response defined above)
type Mutation {
    register(firstName: String!, lastName: String!, emailId: String!, password: String!): Response
    login(emailId: String!, password: String!): Response
    forgotPass(emailId: String!): Response
    resetPass(newPass: String!): Response
    createNote(title: String!, description: String!): Response
    updateNote(id: ID!, title: String!, description: String!): Response
    deleteNote(id: ID!): Response
    createLabel(labelName: String!): Response
    updateLabel(id: ID!, title: String!): Response
    deleteLabel(id: ID!): Response
    createCollab(noteId: String!, collabId: String!): Response
    deleteCollab(noteId: String!, collabId: String!): Response
    archiveNotes(id: ID!): Response
    unArchiveNotes(id: ID!): Response
    trashNotes(id: ID!): Response
    unTrashNotes(id: ID!): Response
    createReminder(title: String!, description: String!, reminder: Date!): Response
    setReminder(reminder: Date!): Response
    githubLoginUrl: String!
    requestGithubToken(code: String!): Response
    githubRepoDetails: Response
}`