'use client';

import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, CardActions } from '@mui/material';
import Link from 'next/link';

const ProductCard = ({ product }) => {
  const handleAddToCart = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/carts/${product._id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (res.ok) {
        alert('Product added to cart!');
      } else {
        alert('Failed to add product to cart.');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while adding the product to the cart.');
    }
  };

  return (
    <Card sx={{ maxWidth: 345, boxShadow: 3, transition: 'transform 0.3s', '&:hover': { transform: 'scale(1.05)' } }}>
      <CardMedia
        component="img"
        height="140"
        image={product.imageUrl}
        alt={product.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${product.price}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Button variant="contained" color="primary" onClick={handleAddToCart}>
          Add to Cart
        </Button>
        <Link href={`/products/${product._id}`} passHref>
          <Button variant="outlined" color="primary">
            View Details
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
