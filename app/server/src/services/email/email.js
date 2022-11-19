const nodemailer = require("nodemailer");
const { templates } = require("./templates");

const transporter = nodemailer.createTransport({
    pool: true,
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.GMAIL_USERNAME,
        pass: process.env.GMAIL_PASSWORD,
    },
});

function sendEmail(toEmail, subject, template, values, callback) {
    const mailOptions = {
        from: process.env.GMAIL_USERNAME,
        to: toEmail,
        subject: subject,
        text: templates.confirmationEmail(template),
    };

    transporter.sendMail(mailOptions, callback);
}

function send_confirmation_email(payload) {
    try {
        sendEmail(
            email,
            "Confirmation Email for Bucademy",
            payload,
            function (err) {
                if (err) {
                    return false, "Email could not be sent."
                }
                return true,''
            }
        )
    }
    catch (e) {
        return false, e.toString()
    }
}

module.exports = { sendEmail, send_confirmation_email };
