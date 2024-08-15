'use client';

import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, IconButton, Card, CardContent, Divider, Box, CircularProgress, Snackbar, Alert } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Layout from '../components/Layout';

const CartPage = () => {
  const [cart, setCart] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/carts', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (res.ok) {
          const data = await res.json();
          setCart(data);
        } else {
          alert('Failed to fetch cart.');
        }
      } catch (error) {
        console.error(error);
        alert('An error occurred while fetching the cart.');
      }
    };

    fetchCart();
  }, []);

  const handleIncrement = async (productId) => {
    const originalCart = { ...cart };
    setCart(prevCart => {
      const updatedItems = prevCart.items.map(item => 
        item.product && item.product._id === productId 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      );
      return { ...prevCart, items: updatedItems };
    });

    try {
      const res = await fetch(`http://localhost:5000/api/carts/increment/${productId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!res.ok) {
        throw new Error('Failed to increment quantity.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while incrementing the quantity.');
      setCart(originalCart);
    }
  };

  const handleDecrement = async (productId) => {
    const originalCart = { ...cart };
    setCart(prevCart => {
      const updatedItems = prevCart.items.map(item => 
        item.product && item.product._id === productId 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      ).filter(item => item.quantity > 0);
      return { ...prevCart, items: updatedItems };
    });

    try {
      const res = await fetch(`http://localhost:5000/api/carts/decrement/${productId}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!res.ok) {
        throw new Error('Failed to decrement quantity.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while decrementing the quantity.');
      setCart(originalCart);
    }
  };

  const handleRemove = async (productId) => {
    const originalCart = { ...cart };
    setCart(prevCart => ({
      ...prevCart,
      items: prevCart.items.filter(item => item.product && item.product._id !== productId),
    }));

    try {
      const res = await fetch(`http://localhost:5000/api/carts/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (!res.ok) {
        throw new Error('Failed to remove product.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while removing the product.');
      setCart(originalCart);
    }
  };

  const calculateTotalAmount = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => {
      const itemPrice = item.product?.price || 0;
      return total + (itemPrice * item.quantity);
    }, 0);
  };

  const handleCheckout = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (cart === null) return <CircularProgress sx={{ display: 'block', margin: 'auto', mt: 5 }} />;
  if (cart.items.length === 0) return (
    <Layout>
      <Typography align="center" variant="h6">Your cart is empty.</Typography>
    </Layout>
  );

  return (
    <Layout>
      <Container maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom>
          Your Cart
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {cart.items
            .filter(item => item.product && item.product.name && item.product.price != null)
            .map((item) => (
              <Card variant="outlined" key={item.product._id} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                <Box sx={{ flexShrink: 0, p: 2 }}>
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    style={{ width: 120, height: 120, objectFit: 'cover' }}
                  />
                </Box>
                <CardContent sx={{ flex: 1 }}>
                  <Typography variant="h6" component="div">
                    {item.product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: ${item.product.price}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="body1">
                    Quantity: {item.quantity}
                  </Typography>
                </CardContent>
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
                  <IconButton color="primary" onClick={() => handleIncrement(item.product._id)}>
                    <AddIcon />
                  </IconButton>
                  <IconButton color="secondary" onClick={() => handleDecrement(item.product._id)} disabled={item.quantity <= 1}>
                    <RemoveIcon />
                  </IconButton>
                  <Button variant="outlined" color="error" onClick={() => handleRemove(item.product._id)} sx={{ mt: 2 }}>
                    Remove
                  </Button>
                </Box>
              </Card>
            ))
          }
          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="h6">
              Total Amount: ${calculateTotalAmount().toFixed(2)}
            </Typography>
            <Button variant="contained" color="primary" onClick={handleCheckout} sx={{ mt: 2 }}>
              Checkout
            </Button>
          </Box>
        </Box>
      </Container>
      
      {/* Snackbar for Checkout */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="info" sx={{ width: '100%' }}>
          Checkout feature is not yet implemented.
        </Alert>
      </Snackbar>
    </Layout>
  );
};

export default CartPage;
