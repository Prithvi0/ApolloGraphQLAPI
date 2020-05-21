# Introduction:
This is a server using Apollo GraphQL and MongoDB.

# Needed:
* [VSCode](https://visualstudio.com) - preferrable IDE.
* [Node.js](https://nodejs.org) - for JavaScript coding.

# Getting Started:
* Use `npm i <dependency-name> --save` to install the dependencies (Refer package.json for all the dependencies).
* Set .env file with Default MongoDB's URL, Port number and a JSON Web Token (JWT).
* Check the MongoDB server by `sudo service mongod status`. If inactive,
* Run the MongoDB server by `sudo service mongod start`.
* Run `npm start` to use the server at `localhost:4000`.

# Task Purpose:
Create a GraphQL Server using MongoDB & its Object Document Model (ODM) library 'Mongoose' for database for user Login and Registration.