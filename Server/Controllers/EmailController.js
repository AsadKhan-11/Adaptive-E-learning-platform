const transporter = require("../Config/nodemailerConfig");

const sendEmail = async (req, res) => {
  const { to, subject, text, html } = req.body;

  const mailOptions = {
    from: '"Your App Name" <your-email@gmail.com>',
    to,
    subject,
    text,
    html,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully", info });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to send email", details: error.message });
  }
};
module.exports = {
  sendEmail,
};
