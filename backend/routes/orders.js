const express = require('express');
const jwt = require('jsonwebtoken');
const Order = require('../models/Order');

const router = express.Router();

// Middleware to verify the JWT token
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid token' });
    }
};

// Create a new order (requires authentication)
router.post('/', verifyToken, async (req, res) => {
    const { products, totalAmount } = req.body;
    const order = new Order({ user: req.user.id, products, totalAmount });
    await order.save();
    res.status(201).json(order);
});

// Get all orders for a user (requires authentication)
router.get('/', verifyToken, async (req, res) => {
    const orders = await Order.find({ user: req.user.id }).populate('products.product');
    res.json(orders);
});

module.exports = router;
