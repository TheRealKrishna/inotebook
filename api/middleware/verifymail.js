const nodemailer = require("nodemailer");
const User = require("../models/User");

const verifyMail = async (email) => {
    try {
        let user = await User.findOne({ email: email });
        const transport = nodemailer.createTransport({
            host: process.env.node_mailer_url,
            port: 465,
            auth: {
                user: process.env.node_mailer_username,
                pass: process.env.node_mailer_password
            }
        });

        const message = {
            from: process.env.node_mailer_username,
            to: email,
            subject: "Verify your email on iNoteBook",
            html: `<p>Please verify your email by clicking on this link: <a href="${process.env.FRONTEND_URL}/auth/verify/${user.id}" target="_blank">${process.env.FRONTEND_URL}/auth/verify/${user.id}</a>`
        }

        transport.sendMail(message, (error) => {
            if (error) {
                return
            }
        });
    } catch (error) {
        return
    }
}

module.exports = verifyMail;