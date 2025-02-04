const nodemailer = require('nodemailer');
const dotenv = require('dotenv');


dotenv.config();
const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail', // or any other email provider you use
    auth: {
      user: process.env.EMAIL_USER, // Your email address
      pass: process.env.EMAIL_PASS, // Your email password or app-specific password
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
