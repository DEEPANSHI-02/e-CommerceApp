const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ['customer', 'admin', 'rider'], default: 'customer' },
  address: { type: String, required: function () { return this.role === 'customer'; } },
  phone: { type: String, required: function () { return this.role === 'customer'; } },
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', default: null }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
