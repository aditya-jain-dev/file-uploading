const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "example@gmail.com",
    pass: "password",
  },
});

const mailOptions = {
  from: "example@gmail.com",
  to: "recipient@example.com",
  subject: "Test Email",
  text: "This is a test email",
};

const mailOptions2 = {
  from: "example@gmail.com",
  to: "recipient@example.com",
  subject: "Test Email with Attachment",
  text: "This is a test email",
  attachments: [{ filename: "document.pdf", path: "/path/to/document.pdf" }],
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Email sent: " + info.response);
  }
});
