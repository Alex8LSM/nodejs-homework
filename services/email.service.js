const { PORT, USER_EMAIL, USER_PASSWORD } = require('../helpers/env');
const BASE_URL = `http://localhost:${PORT}/api`;
const nodemailer = require('nodemailer');
const sendEmail = async (userEmail, verificationToken) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.meta.ua',
    port: 465,
    secure: true,
    auth: {
      user: USER_EMAIL,
      pass: USER_PASSWORD,
    },
  });
  const link = `${BASE_URL}/users/verify/${verificationToken}`;
  // NODEMAILER
  try {
    await transporter.sendMail({
      to: userEmail,
      from: USER_EMAIL, // can be stored in envs
      subject: 'Confirm your email',
      html: `<h4>Click on this link to confirm registration ${link}</h4>`,
    });
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = {
  sendEmail,
};
