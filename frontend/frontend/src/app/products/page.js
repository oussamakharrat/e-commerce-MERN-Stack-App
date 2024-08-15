'use client';

import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { Grid, Typography, Container, Snackbar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close'; // Import the close icon for Snackbar
import Layout from '../components/Layout';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products');
        if (!res.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    try {
      const res = await fetch(`http://localhost:5000/api/carts/${product._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });

      if (res.ok) {
        setSnackbarMessage(`Added ${product.name} to the cart`);
        setSnackbarOpen(true);
      } else {
        setSnackbarMessage('Failed to add product to cart.');
        setSnackbarOpen(true);
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      setSnackbarMessage('An error occurred while adding the product to the cart.');
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Layout>
      <Container sx={{ py: 4 }}>
        <Typography 
          variant="h2" 
          align="center" 
          gutterBottom 
          sx={{ 
            fontFamily: 'Roboto, sans-serif', 
            fontWeight: 'bold',
            color: '#333',
          }}
        >
          Our Products
        </Typography>
        <Typography 
          variant="h5" 
          align="center" 
          gutterBottom 
          sx={{ 
            fontFamily: 'Roboto, sans-serif',
            color: '#666',
          }}
        >
          Discover our luxury collection
        </Typography>
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <ProductCard 
                product={product} 
                onAddToCart={() => handleAddToCart(product)} 
              />
            </Grid>
          ))}
        </Grid>
      </Container>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleCloseSnackbar}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </Layout>
  );
};

export default ProductsPage;
