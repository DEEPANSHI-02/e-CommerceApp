const mongoose = require('mongoose');

const VariantSchema = new mongoose.Schema({
  size: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    default: 0
  },
  sku: {
    type: String,
    required: true,
    unique: true
  },
  images: [String]
});

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ['fan', 'air-conditioner'],
    required: true
  },
  basePrice: {
    type: Number,
    required: true
  },
  brand: String,
  featuredImage: {
    type: String,
    required: true
  },
  variants: [VariantSchema],
  rating: {
    count: {
      type: Number,
      default: 0
    },
    average: {
      type: Number,
      default: 0
    }
  },
  specifications: {
    type: Map,
    of: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Product', ProductSchema);
