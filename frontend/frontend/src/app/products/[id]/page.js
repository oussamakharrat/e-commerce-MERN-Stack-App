'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Button, Typography, Container, Grid, Box, TextField, Rating, Snackbar, Alert } from '@mui/material';
import Layout from '../../components/Layout';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [feedbackList, setFeedbackList] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await res.json();
        setProduct(data);
        setFeedbackList(data.feedback || []); // Set initial feedback list
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!product) return;
    try {
      const res = await fetch(`http://localhost:5000/api/carts/${product._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res.ok) {
        showSnackbar('Product added to cart!', 'success');
      } else {
        showSnackbar('Failed to add product to cart.', 'error');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      showSnackbar('An error occurred while adding the product to the cart.', 'error');
    }
  };

  const handleSubmitRating = async () => {
    if (!product) return;
    try {
      const res = await fetch(`http://localhost:5000/api/products/${product._id}/rate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ rating }),
      });
      if (res.ok) {
        showSnackbar('Thank you for your rating!', 'success');
      } else {
        showSnackbar('Failed to submit rating.', 'error');
      }
    } catch (error) {
      console.error('Error submitting rating:', error);
      showSnackbar('An error occurred while submitting the rating.', 'error');
    }
  };

  const handleSubmitFeedback = async () => {
    if (!product) return;
    try {
      const res = await fetch(`http://localhost:5000/api/feedback/${product._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ feedback }),
      });

      const responseText = await res.text();
      const responseJson = JSON.parse(responseText);

      if (res.ok) {
        setFeedback('');
        setFeedbackList([...feedbackList, { text: feedback }]);
        showSnackbar('Feedback submitted successfully!', 'success');
      } else {
        showSnackbar(`Failed to submit feedback. ${responseJson.message || ''}`, 'error');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      showSnackbar('An error occurred while submitting feedback.', 'error');
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setSnackbarOpen(true);
  };

  if (!product) return <Typography>Loading...</Typography>;

  return (
    <Layout>
      <Container sx={{ my: 8 }}>
        <Typography 
          variant="h4" 
          gutterBottom 
          sx={{ 
            fontFamily: 'Roboto, sans-serif',
            fontWeight: 'bold',
            color: '#333',
          }}
        >
          {product.name}
        </Typography>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              style={{ width: '100%', height: 'auto', borderRadius: '8px', boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }} 
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
              <div>
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2, fontSize: '1.5rem' }}>
                  ${product.price}
                </Typography>
                <Typography sx={{ mb: 4, color: '#555' }}>{product.description}</Typography>
                <Typography sx={{ fontWeight: 'bold', mb: 2 }}>Additional Information:</Typography>
                <Typography sx={{ color: '#666' }}>Category: {product.category || 'N/A'}</Typography>
                <Typography sx={{ color: '#666' }}>Stock: {product.stock || 'N/A'}</Typography>
              </div>
              <Button 
                variant="contained" 
                sx={{ backgroundColor: '#000', color: '#fff', '&:hover': { backgroundColor: '#333' } }} 
                onClick={handleAddToCart}
              >
                Add to Cart
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Rating Section */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Rate this Product
          </Typography>
          <Rating
            value={rating}
            onChange={(event, newValue) => setRating(newValue)}
            sx={{ mb: 2 }}
          />
          <Button 
            variant="contained" 
            sx={{ backgroundColor: '#000', color: '#fff', '&:hover': { backgroundColor: '#333' } }}
            onClick={handleSubmitRating}
          >
            Submit Rating
          </Button>
        </Box>

        {/* Feedback Section */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Leave Your Feedback
          </Typography>
          <TextField
            label="Your Feedback"
            multiline
            rows={4}
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Button 
            variant="contained" 
            sx={{ backgroundColor: '#000', color: '#fff', '&:hover': { backgroundColor: '#333' } }}
            onClick={handleSubmitFeedback}
          >
            Submit Feedback
          </Button>
        </Box>

        {/* Feedback List */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Customer Feedback
          </Typography>
          {feedbackList.length > 0 ? (
            feedbackList.map((fb, index) => (
              <Box 
                key={index} 
                sx={{ 
                  mb: 2, 
                  p: 2, 
                  border: '1px solid #ddd', 
                  borderRadius: '4px', 
                  backgroundColor: '#f9f9f9' 
                }}
              >
                <Typography>{fb.text}</Typography>
              </Box>
            ))
          ) : (
            <Typography>No feedback yet.</Typography>
          )}
        </Box>

        {/* Snackbar for feedback and rating submission */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity}>
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </Layout>
  );
};

export default ProductDetails;
