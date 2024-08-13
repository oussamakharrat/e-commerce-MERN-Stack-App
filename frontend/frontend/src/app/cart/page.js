'use client';

import React, { useEffect, useState } from 'react';
import { Container, Typography, Button, IconButton, Card, CardContent, Divider, Grid, Box, CircularProgress } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Layout from '../components/Layout';

const CartPage = () => {
  const [cart, setCart] = useState(null);

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
      ).filter(item => item.quantity > 0); // Remove items with quantity 0
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

  if (cart === null) return <CircularProgress sx={{ display: 'block', margin: 'auto', mt: 5 }} />;
  if (cart.items.length === 0) return <Typography align="center" variant="h6">Your cart is empty.</Typography>;

  return (
    <Layout>
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" gutterBottom>
          Your Cart
        </Typography>
        <Grid container spacing={3}>
          {cart.items
            .filter(item => item.product && item.product.name && item.product.price != null)
            .map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.product._id}>
                <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <CardContent>
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
                  <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
                    <IconButton color="primary" onClick={() => handleIncrement(item.product._id)}>
                      <AddIcon />
                    </IconButton>
                    <IconButton color="secondary" onClick={() => handleDecrement(item.product._id)} disabled={item.quantity <= 1}>
                      <RemoveIcon />
                    </IconButton>
                    <Button variant="outlined" color="error" onClick={() => handleRemove(item.product._id)} sx={{ ml: 2 }}>
                      Remove
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))
          }
        </Grid>
      </Container>
    </Layout>
  );
};

export default CartPage;
