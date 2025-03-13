const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

exports.sendHelpRequest = async (req, res) => {
  try {
    const { email, comment } = req.body;

    if (!email || !comment) {
      return res
        .status(400)
        .json({ message: "Email and comment are required" });
    }

    if (!isValidEmail(email)) {
      return res
        .status(400)
        .json({ message: "Please provide a valid email address" });
    }

    const msg = {
      to: "taskpro.project@gmail.com",
      from: process.env.VERIFIED_SENDER_EMAIL,
      subject: "TaskPro Help Request",
      text: `Help request from ${email}\n\nComment: ${comment}`,
      html: `
        <h2>TaskPro Help Request</h2>
        <p><strong>From:</strong> ${email}</p>
        <p><strong>Comment:</strong></p>
        <p>${comment.replace(/\n/g, "<br>")}</p>
        <hr>
        <p>Please reply directly to the user's email address: ${email}</p>
      `,
      replyTo: email,
    };

    await sgMail.send(msg);

    res.status(200).json({ message: "Help request sent successfully" });
  } catch (error) {
    console.error("SendGrid error:", error);

    if (error.response) {
      console.error(error.response.body);
    }

    res.status(500).json({
      message: "Failed to send help request. Please try again later.",
    });
  }
};
