/** It modifies stored user data & returns a value.
 * It can be used to perform CRUD operations.
 * Mutations are defined as a part of the schema.
 * @sync
 * @param {string} args -   User Validations based on the input.
 * @return {Error}      -   The data from the input given.
 */

// Module imports
const userModel = require('../../model/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;
const mail = require('../../sendEmail/sendEmail');
let url = process.env.GRAPHQL_URL;
let shortUrl = require('node-url-shortener');

/** It is used to register User on firstName, lastName, emailId & password.
 * @sync
 * @param {String} args                        - args for User registration inputs.
 * @returns {Error}                            - if User Validations are false based on the input.
 * @returns {String, Boolean} message, success - true (User saved), else false.
 */
exports.register = async (parent, args, context) => {
    // validate user first name
    if (args.firstName === null) {
        throw new Error('First name cannot be blank.')
    }

    // validate user last name
    if (args.lastName === null) {
        throw new Error('Last name cannot be blank.')
    }

    if (args.firstName.length < 3 || args.lastName.length < 3) {
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

    let password = await bcrypt.hash(args.password, 12);

    const newUser = new userModel({
        firstName: args.firstName,
        lastName: args.lastName,
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

/** It is used to Login the User using emailId & password.
 * @sync
 * @param {String} args                                   - args for user emailId.
 * @var {hash} comparePass                                - inputted password is compared with hash password.
 * @returns {String, Boolean, ID} message, success, token - true (User emailId is signed by JSON Web Token (JWT))
 * & made private by adding a secret key in .env file, else returns false.
 */
exports.login = async (parent, args, context) => {
    let user = await userModel.findOne({
        emailId: args.emailId
    });
    let comparePass = await bcrypt.compare(args.password, user.password)
    if (comparePass) {
        let token = jwt.sign(
            {
                emailId: user.emailId
            }, secret, { expiresIn: "12d" });
        return {
            message: 'Login successful',
            success: true,
            token: token
        }
    }
    return {
        message: 'Invalid password. Authentication failed',
        success: false,
        token: 'invalid'
    }
}

/** It is used when user forgets the password. A url is sent as an e-mail.
 * @sync
 * @param {String} args                            - args to find user emailId. If found,
 *                                                   an e-mail of graphql url, JWT attached is sent.
 * @returns {String, Boolean, ID} message, success - true (valid user emailId), else returns false.
 */
exports.forgotPassword = async (parent, args, context) => {
    let user = await userModel.findOne({
        emailId: args.emailId
    });
    if (user) {
        let token = jwt.sign(
            {
                emailId: user.emailId
            }, secret, { expiresIn: '12d' });
        this.urlShort(mail.sendEmail(url + token));
        return {
            message: 'E-mail sent to change password.',
            success: true
        }
    } else {
        return {
            message: 'Not a valid request.',
            success: false
        }
    }
}

/** It is used to Reset User password by providing user headers authorization token (JWT),
 * generated for the user when logged in.
 * @sync
 * @param {String, String} args, context       - args for user new password, context for authorization (generated token).
 * @constructor                                - parent is required.
 * @param {String} userAuthorization.emailId   - find emailId using user's JWT.
 * @param {String} args.newPass                - newPass is hash coded & a number (SaltRounds) is passed as an argument.
 *                                              It is used to control time needed to calculate bcrypt hash. 
 *                                              The more the time, the more the difficulty in Brute-forcing.
 * @returns {String, Boolean} message, success - true (User password is resetted by a new password).
 *                                               , else returns false.
 */
exports.resetPassword = async (parent, args, context) => {
    let userAuthorization = jwt.verify(context.authorization, secret);
    console.log(userAuthorization)
    if (!userAuthorization) {
        throw new Error("Invalid user token authentication")
    }
    console.log(userAuthorization.emailId);
    let user = await userModel.findOne({ emailId: userAuthorization.emailId });
    if (!user) {
        throw new Error("Invalid password reset link")
    }
    if (args.newPass) {
        let newPassword = bcrypt.hashSync(args.newPass, 12)
        let updateUser = await user.updateOne(
            { password: newPassword });
        if (updateUser) {
            return {
                message: 'Password successfully resetted.',
                success: true
            };
        } else {
            return {
                message: 'Password not resetted.',
                success: false
            };
        }
    }
}

/** It is used to generate a shortened url.
 * @function (urlShort)
 * @returns             - returns an e-mail with shortened url.
 */
exports.urlShort = urlShort => {
    shortUrl.short(urlShort, (err, urlShort) => {
        mail.sendEmail(urlShort);
    });
}