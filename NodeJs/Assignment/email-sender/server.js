require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");

const app = express();

// Route to send email
app.get("/sendemail", async (req, res) => {
  try {
    // Create a transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: ["dixitabhinav788@gmail.com", "venugopal.burli@masaischool.com"],
      subject: "Test Email from NEM Student",
      text: "This is a testing Mail sent by NEM student, no need to reply.",
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.send("✅ Email sent successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("❌ Failed to send email.");
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
