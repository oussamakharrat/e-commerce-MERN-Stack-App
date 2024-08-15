// routes/carts.js
const express = require('express');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const router = express.Router();

// Middleware to authenticate user
const authenticateUser = (req, res, next) => {
  // Implement your authentication logic here
  req.user = { id: '60d5f484f4d3e25f4c8d2b4b' }; // Example user ID, replace with actual logic
  next();
};

// Get cart for the authenticated user
router.get('/', authenticateUser, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    if (!cart) {
      return res.status(200).json({ message: 'Cart not found', items: [] }); // Return empty cart
    }
    res.json(cart);
  } catch (error) {
    console.error('Error fetching cart:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

// Add item to cart
router.post('/:productId', authenticateUser, async (req, res) => {
  const { productId } = req.params;

  try {
    let cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      cart = new Cart({ user: req.user.id });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const existingItem = cart.items.find(item => item.product.toString() === productId);
    if (existingItem) {
      existingItem.quantity += 1; // Increment quantity if product exists
    } else {
      cart.items.push({ product: productId, quantity: 1 }); // Add new product if not exists
    }

    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(400).json({ message: 'Error adding to cart' });
  }
});

// Remove item from cart
router.delete('/:productId', authenticateUser, async (req, res) => {
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(400).json({ message: 'Error removing from cart' });
  }
});

// Increment item quantity in the cart
router.patch('/increment/:productId', authenticateUser, async (req, res) => {
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.find(item => item.product.toString() === productId);
    if (!item) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    item.quantity += 1; // Increment quantity

    await cart.save();
    res.json(cart);
  } catch (error) {
    console.error('Error incrementing quantity:', error);
    res.status(500).json({ message: 'Error incrementing quantity' });
  }
});

// Decrement item quantity in the cart
router.patch('/decrement/:productId', authenticateUser, async (req, res) => {
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.find(item => item.product.toString() === productId);
    if (item) {
      if (item.quantity > 1) {
        item.quantity -= 1;
        await cart.save();
        res.json(cart);
      } else {
        // Remove the item if quantity is zero
        cart.items = cart.items.filter(i => i.product.toString() !== productId);
        await cart.save();
        res.json(cart);
      }
    } else {
      res.status(404).json({ message: 'Item not found in cart' });
    }
  } catch (error) {
    console.error('Error decrementing quantity:', error);
    res.status(500).json({ message: 'Error decrementing quantity' });
  }
});

module.exports = router;
