const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail", // Or use Mailtrap/other providers
  auth: {
    user: process.env.EMAIL_USER, // Environment variables for security
    pass: process.env.EMAIL_PASS,
  },
});

module.exports = transporter;
