const sgMail = require("@sendgrid/mail");

// Set SendGrid API key from environment variables
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Helper function to validate email
const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Send help request email
exports.sendHelpRequest = async (req, res) => {
  try {
    const { email, comment } = req.body;

    // Validate input
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

    // Create email message
    const msg = {
      to: "taskpro.project@gmail.com",
      from: process.env.SENDGRID_FROM_EMAIL, // Must be verified in SendGrid
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

    // Send email
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
