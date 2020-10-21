const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} =  require('../config');


// helper to hash password
const hashPassword = (password) => {
  return bcrypt.hash(password, 10);
};

// Helper to compare password
const comparePassword = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

const isValidEmail = (email) => {
  const testEmail = /\S+@\S+\.\S+/.test(email);
  if (!testEmail) {
    return 'Invalid Email';
  }
  return email;
};

const generateToken = (User) => {
  const token = jwt.sign(User, JWT_SECRET, { expiresIn: '7d' });
  return token;
};


module.exports = { hashPassword, comparePassword, isValidEmail, generateToken };