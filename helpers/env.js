require('dotenv').config();
const { PORT, DB_HOST, SECRET_KEY, USER_EMAIL, USER_PASSWORD } = process.env;

module.exports = {
  PORT,
  DB_HOST,
  SECRET_KEY,
  USER_EMAIL,
  USER_PASSWORD,
};
