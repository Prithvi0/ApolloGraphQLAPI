/** It defines the technique for fetching the types defined in the schema.
 * This resolver retrieves details from the user.
 * @property {object} Query     -   Returns Welcome message.
 * @property {object} Mutation  -   Returns stored data and a specific value.
 */

const message = require('../graphQL/query').message;
const register = require('../graphQL/mutation/users').register;
const login = require('../graphQL/mutation/users').login;
const forgotPass = require('../graphQL/mutation/users').forgotPassword;
const resetPass = require('../graphQL/mutation/users').resetPassword;
const allUsers = require('../graphQL/query').getAllUsers;
const userById = require('../graphQL/query').getUserById;
const createNote = require('../graphQL/mutation/notes').createNote;
const retrieveNote = require('../graphQL/mutation/notes').retrieveNote;
const updateNote = require('../graphQL/mutation/notes').updateNote;
const deleteNote = require('../graphQL/mutation/notes').deleteNote;
const notesByUserId = require('../graphQL/query').getNotesByUserId;
const allNotes = require('../graphQL/query').getAllNotes;

// resolvers
exports.resolvers = {
    Query: {
        message,
        allUsers,
        userById,
        notesByUserId,
        allNotes
    },

    Mutation: {
        register,
        login,
        forgotPass,
        resetPass,
        createNote,
        retrieveNote,
        updateNote,
        deleteNote
    }
}