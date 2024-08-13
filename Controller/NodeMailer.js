const nodemailer = require("nodemailer");

const sendMail = async (req, res) => {
  let { name, email, message } = req.body; 
  let { id } = req.params;
  
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: process.env.MAILID,
      pass: process.env.MAIL_PASSKEY,
    },
  });

  // async..await is not allowed in global scope, must use a wrapper

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: `${name} <${process.env.MAILID}>`, // sender address
    to: process.env.MAILID, // list of receivers
    subject: "Message from Rental house!", // Subject line
    text: ` From  : ${email}
            Message : ${message}`, // plain text body
  });

  console.log("Message sent: %s", info.messageId);
  req.flash("success", "Message send succesfully!");
  res.redirect(`/listings/${id}`);
  // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
};

module.exports = sendMail;
