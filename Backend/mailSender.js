const nodemailer = require("nodemailer");
const secrets = require('./secrets')

async function mailSender(email , token) {

    // input through which mechanism send your email
    //  -> port, facilitator (technical details) 
    let transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        secure: true,
        auth: {
            user: secrets.APP_EMAIL,
            pass: secrets.APP_PASS
        }
    });

    // send mail with defined transporter object
    let info = await transporter.sendMail({
        from: '"Mktintumon👻" <mktintumon@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Password Reset requested", // Subject line
        html: `<b>Your reset token is :-> ${token}</b>`,
    });
}

// mailSender(email , token)
//     .then(function () {
//         console.log("mail send successfully")
//     })
//     .catch(console.error);

module.exports = mailSender;    