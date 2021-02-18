const mongoose = require('mongoose');

//User schema
const UserSchema = mongoose.Schema({
  email:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  key:{
    type: String,
    required: false
  },
  hwid:{
    type: String,
    required: false
  },
  paypalEmail:{
    type: String,
    required: false
  },
  hwidResets:{
    type: String,
    required: false
  },
  discord: {
    type: String,
    required: false
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date
});
const User = module.exports = mongoose.model('User', UserSchema);