import mongoose from 'mongoose';
import User from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    
    const adminExists = await User.findOne({ email: 'admin@salesswiftly.com' });
    
    if (!adminExists) {
      await User.create({
        email: 'admin@salesswiftly.com',
        password: 'admin123',
        name: 'Admin User',
        role: 'admin'
      });
      console.log('Default admin user created');
    }
    
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding admin:', error);
  }
};

seedAdmin();