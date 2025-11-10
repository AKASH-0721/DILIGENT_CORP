const express = require('express');
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart
} = require('../controllers/cartController');

const router = express.Router();

// GET /api/cart/:sessionId - Get cart by session ID
router.get('/:sessionId', getCart);

// POST /api/cart/add - Add item to cart
router.post('/add', addToCart);

// PUT /api/cart/update - Update cart item quantity
router.put('/update', updateCartItem);

// DELETE /api/cart/remove/:sessionId/:productId - Remove item from cart
router.delete('/remove/:sessionId/:productId', removeFromCart);

// DELETE /api/cart/clear/:sessionId - Clear entire cart
router.delete('/clear/:sessionId', clearCart);

module.exports = router;