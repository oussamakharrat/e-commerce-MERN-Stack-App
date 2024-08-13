const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback'); // Import your Feedback model
const jwt = require('jsonwebtoken'); // Import the JWT library

// Middleware to verify the token and extract userId
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user; // Store the user object in the request
    next();
  });
};

router.post('/feedback', authenticateToken, async (req, res) => {
  const { productId, rating, comment } = req.body;
  const userId = req.user.id; // Extract userId from the authenticated user

  if (!productId || !rating || !comment || !userId) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const feedback = new Feedback({
      productId,
      rating,
      comment,
      userId // Use the userId extracted from the JWT
    });

    await feedback.save();
    res.status(201).json(feedback);
  } catch (error) {
    console.error('Error creating feedback:', error);
    res.status(500).json({ message: 'Error creating feedback' });
  }
});

module.exports = router;
