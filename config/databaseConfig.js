/** It connects to mongo database using mongodb default url.
 * @method 
 * @param {URL} MONGO_URL               -  Defined in the `.env`
 * @property {ConnectionOptions} boolean -  To pass option to mongo connection (fix deprecation warnings).
 * @returns - message
 */

// Module imports
const mongoose = require('mongoose');
require('dotenv').config();

// database connection using mongo url stored in .env file
module.exports = mongoose.connect(process.env.MONGO_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }).then(() => {
        console.log("Successfully connected to the database");
    }).catch(err => {
        console.log('Could not connect to the database. Exiting now...', err);
        process.exit();
    });