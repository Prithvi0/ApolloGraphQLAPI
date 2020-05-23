/** It modifies stored user data & returns a value.
 * It can be used to perform CRUD operations.
 * Mutations are defined as a part of the schema.
 * @sync
 * @param {string} args -   User Validations based on the input.
 * @return {Error}      -   The data from the input given.
 */

const userModel = require('../../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

exports.register = async (parent, args, context) => {
    // validate user name
    if (args.userName === null) {
        throw new Error('User name can not be blank.')
    }
    if (args.userName.length < 3) {
        throw new Error('Minimum of 3 characters required.')
    }

    // validate e-mail
    const emailRegex = /^[a-zA-Z]+([+-_.][a-zA-Z0-9])*[0-9]*\@[a-z0-9]+[.]([a-z]{2,4}[.])?[a-z]{2,4}$/;
    if (args.emailId === null) {
        throw new Error('E-mail can not be blank. Please try entering a valid e-mail.');
    }
    if (!emailRegex.test(args.emailId)) {
        throw new Error('Invalid e-mail');
    }

    // validate password
    if (args.password === null) {
        throw new Error('Password can not be blank. Please Enter a 8-character long password');
    }
    if (args.password.length < 8) {
        throw new Error('password must be atleast 8 characters long');
    }

    // check for user
    const user = await userModel.find({
        emailId: args.emailId
    });
    if (user.length > 0) {
        throw new Error('e-mail already registered');
    }

    password = await bcrypt.hash(args.password, 12);

    const newUser = new userModel({
        userName: args.userName,
        emailId: args.emailId,
        password: password
    });

    // save user
    const saveUser = await newUser.save();

    if (saveUser) {
        return {
            message: 'Registration Success!',
            success: true
        };
    } else {
        return {
            message: 'Registration Failed!',
            success: false
        };
    }
}

exports.login = async (parent, args, context) => {
    let user = await userModel.findOne({
        emailId: args.emailId
    });
    let comparePass = await bcrypt.compare(args.password, user.password)
    if (comparePass) {
        let token = jwt.sign(
            {
                emailId: user.emailId
            }, secret, { expiresIn: "12h" });
        return {
            message: 'Login successful',
            success: 'true',
            token: token
        }
    }
    return {
        message: 'Invalid password. Authentication failed',
        success: 'false',
        token: 'invalid'
    }
}