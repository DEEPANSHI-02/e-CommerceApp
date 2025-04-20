const mongoose = require('mongoose');
const dotenv = require('dotenv');
const ApprovedEmail = require('../models/ApprovedEmail');

dotenv.config();

const seedApprovedEmails = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');

   
    await ApprovedEmail.deleteMany({});
    console.log('🧹 Cleared existing approved emails');

   
    await ApprovedEmail.insertMany([
      { email: 'deepanshik825@gmail.com', role: 'admin' },
      { email: 'deepanshisingh055@gmail.com', role: 'rider' },
      { email: 'deepanshi.p24@medhaviskillsuniversity.edu.in', role: 'customer' },
    ]);

    console.log(' Approved emails seeded successfully');
  } catch (err) {
    console.error(' Failed to seed approved emails:', err.message);
  } finally {
    mongoose.disconnect();
  }
};

seedApprovedEmails();
