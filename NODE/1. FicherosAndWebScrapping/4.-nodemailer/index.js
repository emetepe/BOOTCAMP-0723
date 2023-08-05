//! ----- Imports
const express = require("express");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();

// ---- Init server
const server = express();
const router = express.Router();

const URL = process.env.URL;
const EMAILNODEMAILER = process.env.EMAIL_ENV;
const PASSWORD = process.env.PASSWORD_ENV;
const PORT = process.env.PORT;

router.get("/sendNewMail", (req, res) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAILNODEMAILER,
      pass: PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });


// ----- Crear variable con las opciones
const mailOptions = {
  from: EMAILNODEMAILER,
  to: "martapr@emetepe.com",
  subject: "Confirmation Code",
  text: "Everything is OK",
};


// ------- Enviamos el correo
transporter.sendMail(mailOptions, function(error, info) {
    console.log(error);
  if (error) {
    return error;
  } else {
    return res.status(200).json("Email sent" + info.response);
  }
});
});

// ----- Usar servidor y usarlo
server.use("/", router);

server.listen(PORT, () => {
  console.log(`Server running on ${URL}`);
});
