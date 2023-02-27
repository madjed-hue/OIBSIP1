import * as dotenv from "dotenv";
dotenv.config();

import { createTransport } from "nodemailer";

const sendEmail = async (options) => {
  const transporter = createTransport({
    host: process.env.SMTP_HOST,
    port: 465,
    service: process.env.SMTP_SERVICE,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL,
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  await transporter.sendMail(mailOptions);
};

export default sendEmail;
