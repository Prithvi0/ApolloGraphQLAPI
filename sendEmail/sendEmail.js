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