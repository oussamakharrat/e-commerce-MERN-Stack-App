'use client';

import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import { Grid, Typography, Container } from '@mui/material';
import Layout from '../components/Layout';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

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

  return (
    <Layout>
      <Container>
        <Typography variant="h2" align="center" gutterBottom>
          Our Products
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          Discover our luxury collection
        </Typography>
        <Grid container spacing={4}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product._id}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Layout>
  );
};

export default ProductsPage;
