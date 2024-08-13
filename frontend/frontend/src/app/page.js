// pages/index.js

'use client';

import React, { useEffect, useState } from 'react';
import ProductCard from './components/ProductCard'; // Adjust the path as needed
import { Grid, Typography, Container, Box, Button, Card, CardContent, CardMedia, TextField } from '@mui/material';
import Layout from './components/Layout'; // Adjust the path as needed

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products/featured'); // Adjust the API endpoint as needed
        if (!res.ok) {
          throw new Error('Failed to fetch featured products');
        }
        const data = await res.json();
        setFeaturedProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchCategories = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/categories'); // Adjust the API endpoint as needed
        if (!res.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchTestimonials = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/testimonials'); // Adjust the API endpoint as needed
        if (!res.ok) {
          throw new Error('Failed to fetch testimonials');
        }
        const data = await res.json();
        setTestimonials(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchFeaturedProducts();
    fetchCategories();
    fetchTestimonials();
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <Box 
        sx={{ 
          backgroundImage: 'url(/path-to-your-hero-image.jpg)', // Replace with your image path
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#fff',
          py: 8,
          textAlign: 'center',
          borderRadius: '8px',
          mb: 4,
        }}
      >
        <Typography variant="h2" gutterBottom>
          Discover the Best Deals on Luxury Products
        </Typography>
        <Typography variant="h5" gutterBottom>
          Shop the finest selection of exclusive products.
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          sx={{ mt: 4 }}
          href="/products"
        >
          Shop Now
        </Button>
      </Box>

      {/* Featured Categories Section */}
      <Container sx={{ mb: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Shop by Categories
        </Typography>
        <Grid container spacing={4}>
          {categories.map((category) => (
            <Grid item xs={12} sm={6} md={4} key={category._id}>
              <Card sx={{ height: '100%' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={category.image} // Replace with category image URL
                  alt={category.name}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {category.name}
                  </Typography>
                  <Button variant="outlined" color="primary" href={`/categories/${category._id}`}>
                    Explore
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Products Section */}
      <Container sx={{ mb: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Featured Products
        </Typography>
        <Grid container spacing={4}>
          {featuredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Promotional Banner */}
      <Box 
        sx={{ 
          backgroundColor: '#f8d7da', 
          py: 4, 
          textAlign: 'center', 
          borderRadius: '8px', 
          mb: 4 
        }}
      >
        <Typography variant="h5" gutterBottom>
          Special Offer: 20% Off All Items!
        </Typography>
        <Typography variant="body1" gutterBottom>
          Use code <strong>SAVE20</strong> at checkout.
        </Typography>
        <Button 
          variant="contained" 
          color="secondary" 
          href="/products"
        >
          Shop Now
        </Button>
      </Box>

      {/* Testimonials Section */}
      <Container sx={{ mb: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          What Our Customers Say
        </Typography>
        <Grid container spacing={4}>
          {testimonials.map((testimonial) => (
            <Grid item xs={12} sm={6} md={4} key={testimonial._id}>
              <Box 
                sx={{ 
                  border: '1px solid #ddd', 
                  borderRadius: '8px', 
                  p: 2, 
                  backgroundColor: '#f9f9f9', 
                  textAlign: 'center' 
                }}
              >
                <Typography variant="h6" gutterBottom>
                  {testimonial.name}
                </Typography>
                <Typography variant="body2">
                  "{testimonial.text}"
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Newsletter Signup Section */}
      <Box 
        sx={{ 
          backgroundColor: '#f0f0f0', 
          py: 4, 
          textAlign: 'center', 
          borderRadius: '8px' 
        }}
      >
        <Typography variant="h4" gutterBottom>
          Stay Updated with Our Newsletter
        </Typography>
        <Typography variant="body1" gutterBottom>
          Subscribe to receive the latest news and exclusive offers.
        </Typography>
        <Box component="form" noValidate autoComplete="off">
          <TextField
            label="Email Address"
            variant="outlined"
            sx={{ mb: 2, width: '300px' }}
          />
          <br />
          <Button 
            variant="contained" 
            color="primary"
            type="submit"
          >
            Subscribe
          </Button>
        </Box>
      </Box>
    </Layout>
  );
};

export default Home;
