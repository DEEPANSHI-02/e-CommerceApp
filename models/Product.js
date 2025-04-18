const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  variants: [
    {
      size: { type: String, required: true },
      color: { type: String, required: true },
      stock: { type: Number, required: true }
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
