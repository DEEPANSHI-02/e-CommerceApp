const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { auth, adminAuth } = require('../middleware/auth');

// Get all products
router.get('/', async (req, res) => {
  try {
    const { category, sort, limit = 10, page = 1 } = req.query;
    
    const query = {};
    if (category) {
      query.category = category;
    }
    
    const sortOptions = {};
    if (sort === 'price-asc') {
      sortOptions.basePrice = 1;
    } else if (sort === 'price-desc') {
      sortOptions.basePrice = -1;
    } else if (sort === 'newest') {
      sortOptions.createdAt = -1;
    } else if (sort === 'rating') {
      sortOptions['rating.average'] = -1;
    }
    
    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const products = await Product.find(query)
      .sort(sortOptions)
      .limit(parseInt(limit))
      .skip(skip);
    
    const totalProducts = await Product.countDocuments(query);
    
    res.json({
      products,
      currentPage: parseInt(page),
      totalPages: Math.ceil(totalProducts / parseInt(limit)),
      totalProducts
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// Create new product (Admin only)
router.post('/', adminAuth, async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      basePrice,
      brand,
      featuredImage,
      variants,
      specifications
    } = req.body;
    
    const product = new Product({
      name,
      description,
      category,
      basePrice,
      brand,
      featuredImage,
      variants,
      specifications
    });
    
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update product (Admin only)
router.put('/:id', adminAuth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    const {
      name,
      description,
      category,
      basePrice,
      brand,
      featuredImage,
      variants,
      specifications
    } = req.body;
    
    product.name = name || product.name;
    product.description = description || product.description;
    product.category = category || product.category;
    product.basePrice = basePrice || product.basePrice;
    product.brand = brand || product.brand;
    product.featuredImage = featuredImage || product.featuredImage;
    product.variants = variants || product.variants;
    product.specifications = specifications || product.specifications;
    product.updatedAt = Date.now();
    
    await product.save();
    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete product (Admin only)
router.delete('/:id', adminAuth, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    await product.remove();
    res.json({ message: 'Product removed' });
  } catch (error) {
    console.error('Error deleting product:', error);
    if (error.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;