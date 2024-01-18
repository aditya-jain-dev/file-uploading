const mongoose = require("mongoose");
const {transporter} = require('../config/mail');

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
  },
  tags: {
    type: String,
  },
  email: {
    type: String,
  },
});

// post middleware
fileSchema.post("save", async function (doc) {
  try {
    // console.log("printing docs: ", doc);
    
    // send mail
    let mailOptions = {
      from: "aditya jain",
      to: doc.email,
      subject: "new file uploaded on coudinary",
      html: `<h2>Hello Jee</h2> <p>File uploaded view here: <a href="${doc.fileUrl}">click here</a></p>`,
    //   attachments: [{ filename: "document.pdf", path: "/path/to/document.pdf" }],
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    console.error(error);
  }
});

const File = mongoose.model("File", fileSchema);
module.exports = File;