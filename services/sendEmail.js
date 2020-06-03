/** It is used to send a token as an e-mail to the pre-defined user.
 * Here, sender and receiver are same & values are set inside the .env file.
 * To use gmail service, one needs to toggle ON the Access for less secure apps under google settings.
 */

// Module import
const mail = require('nodemailer');

exports.sendEmail = token => {
    const transporter = mail.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: 'Sending E-mail using Node.js',
        text: `${token}`
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log("E-mail sent" + info.response);
        }
    });
}