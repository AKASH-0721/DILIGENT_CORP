const express = require('express');
const {
  getProducts,
  getProductById,
  getProductsByCategory,
  getFeaturedProducts,
  getCategories
} = require('../controllers/productController');

const router = express.Router();

// GET /api/products - Get all products with filtering and pagination
router.get('/', getProducts);

// GET /api/products/featured - Get featured products
router.get('/featured', getFeaturedProducts);

// GET /api/products/categories - Get all categories
router.get('/categories', getCategories);

// GET /api/products/category/:category - Get products by category
router.get('/category/:category', getProductsByCategory);

// GET /api/products/:id - Get single product by ID
router.get('/:id', getProductById);

module.exports = router;