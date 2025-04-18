// utils/seedApprovedEmails.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const ApprovedEmail = require('../models/ApprovedEmail');

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(async () => {
  await ApprovedEmail.insertMany([
    { email: 'deepanshik825@gmail.com', role: 'admin' },
    { email: 'deepanshik825@gmail.com', role: 'rider' },
    { email: 'deepanshik825@gmail.com', role: 'customer' },
  ]);

  console.log('Approved emails added');
  mongoose.disconnect();
});
