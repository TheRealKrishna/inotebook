const nodemailer = require("nodemailer");
const User = require("../models/User");

const verifyMail = async (email)=>{
    try {
        let user = await User.findOne({email:email});
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
            subject: "Verify your email on Themes Code shop",
            html: `<p>Please verify your email by clicking on this link: <a href="https://themescode.shop/api/auth/verify/${user.id}" target="_blank">https://themescode.shop/api/auth/verify/${user.id}</a>`
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