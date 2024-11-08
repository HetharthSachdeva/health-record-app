// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // image: { type: String, default:"" },
// address: { type: Object, default: {line1:'',line2:''} },
// gender: {type: String, default: "Not Selected"},
// dob: {type: String, default: "Not Selected"},
// phone: {type: String, default: '000000000'}
//   reports: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Report'
//   }]
});

module.exports = mongoose.model('user', userSchema);
