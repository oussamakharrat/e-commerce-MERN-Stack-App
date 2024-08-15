'use client';

import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, CardActions } from '@mui/material';
import Link from 'next/link';

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <Card 
      sx={{ 
        maxWidth: 300,
        minHeight: 380,
        boxShadow: 3,
        display: 'flex',
        flexDirection: 'column',
        transition: 'transform 0.3s',
        '&:hover': { transform: 'scale(1.03)' },
      }}
    >
      <CardMedia
        component="img"
        height="140"
        image={product.imageUrl}
        alt={product.name}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ${product.price}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Button 
          variant="contained"
          sx={{ 
            backgroundColor: '#000000',
            color: '#ffffff',
            textTransform: 'none',
            borderRadius: 1,
            padding: '8px 16px',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#333333',
            },
          }} 
          onClick={() => onAddToCart(product)}
        >
          Add to Cart
        </Button>
        <Link href={`/products/${product._id}`} passHref>
          <Button 
            variant="outlined"
            sx={{ 
              borderColor: '#000000',
              color: '#000000',
              textTransform: 'none',
              borderRadius: 1,
              padding: '8px 16px',
              fontWeight: 'bold',
              '&:hover': {
                borderColor: '#333333',
                color: '#333333',
              },
            }}
          >
            View Details
          </Button>
        </Link>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
