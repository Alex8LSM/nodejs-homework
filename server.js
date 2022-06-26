const app = require('./app');
const mongoose = require('mongoose');
const { PORT, DB_HOST } = require('./helpers/env');

mongoose
  .connect(DB_HOST)
  .then(() => {
    console.log('Database connection successful');
    app.listen(PORT, () => {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch((err) => {
    console.log('PORT: ', PORT);
    console.log('DB_HOST: ', DB_HOST);
    console.log('ERROR: ', err);
    process.exit(1);
  });
