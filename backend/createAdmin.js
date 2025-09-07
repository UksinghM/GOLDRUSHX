const mongoose = require('mongoose');
const Admin = require('./models/Admin');
require('dotenv').config();

const url = process.env.DB_URL || 'mongodb://localhost:27017/extendease';

async function createAdmin() {
  try {
    await mongoose.connect(url);
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email: 'admin@extendease.com' });
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    // Create new admin user
    const admin = new Admin({
      email: 'admin@extendease.com',
      password: 'admin123'
    });

    await admin.save();
    console.log('Admin user created successfully');
    console.log('Email: admin@extendease.com');
    console.log('Password: admin123');

  } catch (error) {
    console.error('Error creating admin:', error);
  } finally {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
}

createAdmin(); 