const mail = require('nodemailer');

exports.sendEmail = (token, payload) => {
    const transporter = mail.createTransport({
        service: 'TempMail',
        auth: {
            user: process.env.EMAIL,
        }
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: payload.emailId,
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
