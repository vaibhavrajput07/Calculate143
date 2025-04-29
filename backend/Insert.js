require('dotenv').config();

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Password=require('./models/Password');
// MongoDB URI
const dbURI = process.env.ATLASDB_URL;

// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log('MongoDB Connection Error:', err));



// Function to insert hashed password
async function insertPassword() {
  try {
    const plainPassword = '7507247824'; // your password
    const saltRounds = 10;

    const hashedPassword = await bcrypt.hash(plainPassword, saltRounds);

    const newPassword = new Password({ password: hashedPassword });

    await newPassword.save();
    console.log('Password inserted successfully! ✅');

    mongoose.disconnect();
  } catch (error) {
    console.error('Error inserting password:', error);
    mongoose.disconnect();
  }
}

// Run the function
insertPassword();
