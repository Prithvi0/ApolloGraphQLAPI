/** It defines the technique for fetching the types defined in the schema.
 * This resolver retrieves details from the user.
 * @property {object} Query     -   Returns Welcome message.
 * @property {object} Mutation  -   Returns stored data and a specific value.
 */

// query and mutation module imports
const message = require('../graphQL/query').message;
const register = require('../graphQL/mutation/users').register;
const login = require('../graphQL/mutation/users').login;
const forgotPass = require('../graphQL/mutation/users').forgotPassword;
const resetPass = require('../graphQL/mutation/users').resetPassword;
const allUsers = require('../graphQL/query').getAllUsers;
const userById = require('../graphQL/query').getUserById;
const createNote = require('../graphQL/mutation/notes').createNote;
const updateNote = require('../graphQL/mutation/notes').updateNote;
const deleteNote = require('../graphQL/mutation/notes').deleteNote;
const notesByUserId = require('../graphQL/query').getNotesByUserId;
const allNotes = require('../graphQL/query').getAllNotes;
const createLabel = require('../graphQL/mutation/labels').createLabel;
const updateLabel = require('../graphQL/mutation/labels').updateLabel;
const deleteLabel = require('../graphQL/mutation/labels').deleteLabel;
const labelsByUserId = require('../graphQL/query').getLabelsByUserId;
const allLabels = require('../graphQL/query').getAllLabels;
const createCollab = require('../graphQL/mutation/collaborators').createCollab;
const collabsByUserId = require('../graphQL/query').getCollabsByUserId;
const archiveNotes = require('../graphQL/mutation/notes').archiveNote;
const unArchiveNotes = require('../graphQL/mutation/notes').unArchiveNote;
const trashNotes = require('../graphQL/mutation/notes').trashNote;
const unTrashNotes = require('../graphQL/mutation/notes').unTrashNote;
const getArchiveNotes = require('../graphQL/query').getArchiveNotes;
const getTrashNotes = require('../graphQL/query').getTrashNotes;
const createReminder = require('../graphQL/mutation/reminders').createReminder;
const setReminder = require('../graphQL/mutation/reminders').setReminder;
const getReminders = require('../graphQL/query').getReminders;
const githubLoginUrl = require('../graphQL/mutation/gitHubAuthorization').githubLoginUrl;
const requestGithubToken = require('../graphQL/mutation/gitHubAuthorization').requestGithubToken;
const githubDetails = require('../graphQL/mutation/gitHubAuthorization').githubDetails;
const githubRepoDetails = require('../graphQL/mutation/gitHubAuthorization').githubRepoDetails;

// resolvers
exports.resolvers = {
    Query: {
        message,
        allUsers,
        userById,
        notesByUserId,
        allNotes,
        labelsByUserId,
        allLabels,
        collabsByUserId,
        getArchiveNotes,
        getTrashNotes,
        getReminders
    },

    Mutation: {
        register,
        login,
        forgotPass,
        resetPass,
        createNote,
        updateNote,
        deleteNote,
        createLabel,
        updateLabel,
        deleteLabel,
        createCollab,
        archiveNotes,
        unArchiveNotes,
        trashNotes,
        unTrashNotes,
        createReminder,
        setReminder,
        githubLoginUrl,
        requestGithubToken,
        githubDetails,
        githubRepoDetails
    }
};