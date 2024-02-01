const nodemailer = require("nodemailer");

const passwordResetMail = async (email, resetPasswordToken)=>{
    try {
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
            subject: "Password Reset Link for iNoteBook",
            html: `<p>A password change request was created on iNoteBook, Click on this link to change your password : <a href="${process.env.FRONTEND_URL}/forgot-password/?token=${resetPasswordToken}" target="_blank">${process.env.FRONTEND_URL}/forgot-password/?token=${resetPasswordToken}</a><br>Ignore if this request was not made by you!`
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

module.exports = passwordResetMail;