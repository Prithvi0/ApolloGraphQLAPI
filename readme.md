# Introduction:
This is a server using Apollo GraphQL and MongoDB.

# Needed:
* [VSCode](https://visualstudio.com) - preferrable IDE.
* [Node.js](https://nodejs.org) - for JavaScript coding.

* Before getting started, make sure all the necessary node modules are installed using npm or npx (Refer npm installation). 

# Getting Started:
* Use `npm i <dependency-name> --save` to install the dependencies (Refer package.json for all the dependencies).
* Set .env file with Default MongoDB's URL, Port number and a Secret Key.
* The values are stored like this,
    For port, use `PORT=<port number (typically, use any 4-digit number)>`.
* These values can be retrieved through the file by using `process.env.<stored value>`.
* Check the MongoDB server connection status.
* If inactive, run the MongoDB server.
* Run `npm start` to use the server at `http://localhost:<port>`.

# Other Requirements:
* Also for Node Mailer, set values for sender and receiver or use both same and save in .env file for e-mail privacy purpose.

# Task Purpose:
Create a GraphQL Server using MongoDB & its Object Document Model (ODM) library 'Mongoose' for database for Fundoo Notes App.
Refer files comments to understand even better.
