// utils/mailer.js
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", // or use host/port for custom SMTP
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendResetEmail(to, resetUrl) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "Password Reset Request",
    text: `You requested a password reset. Click the link to reset your password: ${resetUrl}\nIf you did not request this, ignore this email.`,
    html: `<p>You requested a password reset. Click the link to reset your password:</p>
           <p><a href="${resetUrl}">${resetUrl}</a></p>
           <p>If you did not request this, ignore this email.</p>`
  };
  return transporter.sendMail(mailOptions);
}

module.exports = { sendResetEmail };
