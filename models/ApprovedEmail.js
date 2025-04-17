const mongoose = require('mongoose');

const approvedEmailSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true }
}, { timestamps: true });

module.exports = mongoose.model('ApprovedEmail', approvedEmailSchema);
