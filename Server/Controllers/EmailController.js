const transporter = require("../Config/nodemailerConfig");
require("dotenv").config();

const sendEmail = async (req, res) => {
  const { email, message, user } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `Message from ${user}`,
    text: `User Email: ${email} \n Message: ${message}`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully", info });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ error: "Failed to send email", details: error.message });
  }
};
module.exports = {
  sendEmail,
};
