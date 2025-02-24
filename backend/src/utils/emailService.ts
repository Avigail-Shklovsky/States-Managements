import nodemailer from "nodemailer";

export const sendEmail = async (to: string, subject: string, text: string) => {
  const transporter = nodemailer.createTransport({
    pool: true,
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SRC_EMAIL,
      pass: process.env.GMAIL_PASS_APP,
    },
  });

  await transporter.sendMail({ from: process.env.SRC_EMAIL, to, subject, text });
};
