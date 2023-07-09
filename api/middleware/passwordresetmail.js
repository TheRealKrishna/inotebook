const nodemailer = require("nodemailer");

const passwordResetMail = async (email, resetPasswordToken)=>{
    try {
        const transport = nodemailer.createTransport({
            host: "business97.web-hosting.com",
            port: 465,
            auth: {
            user: "support@themescode.shop",
            pass: "KrishnaGG941."
            }
          });
    
        const message = {
            from: "support@themescode.shop",
            to: email,
            subject: "Password Reset Link for Themes Code shop",
            html: `<p>A password change request was created on themescode.shop, Click on this link to change your password : <a href="https://themescode.shop/forgot-password/?token=${resetPasswordToken}" target="_blank">https://themescode.shop/forgot-password/?token=${resetPasswordToken}</a><br>Ignore if this request was not made by you!`
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