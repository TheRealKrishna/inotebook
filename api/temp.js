const nodemailer = require('nodemailer');

// Create a transporter using SMTP or some other transport mechanism
let transporter = nodemailer.createTransport({
    host: 'mail.krishna.lol',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'mail@krishna.lol', // Your email address
        pass: 'KrishnaGG941.' // Your email password
    }
});

// Email message options
let mailOptions = {
    from: 'mail@krishna.lol', // Sender address
    to: 'agarwl.krishna2@gmail.com', // List of recipients
    subject: 'Test Email', // Subject line
    text: 'This is a test email from Nodemailer' // Plain text body
};

// Send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log('Error occurred:', error);
    }
    console.log('Message sent successfully:', info.response);
});
