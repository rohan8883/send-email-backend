require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const generateEmailTemplate = require("./emailTemplate");
const app = express();
app.use(express.json());
app.use(cors()); // Enable frontend communication

// Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// API Endpoint to Send Emails
app.post("/send-email", async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    await transporter.sendMail({
      from: `"${name}" <${process.env.EMAIL_USER}>`, 
      to: "rohansingh9135@gmail.com",  
      subject: `New Message from ${name} - ${subject}`,
      html: generateEmailTemplate(name, email, subject, message), // Use the HTML template
    });

    res.json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error sending email", error });
  }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

