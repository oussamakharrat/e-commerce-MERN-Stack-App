'use client';

import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Card, CardContent, Divider, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import Layout from '../components/Layout';

const OrdersPage = () => {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/orders', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        if (!res.ok) {
          throw new Error('Failed to fetch orders');
        }
        const data = await res.json();
        setOrders(data);
      } catch (error) {
        console.error(error);
        alert('An error occurred while fetching orders.');
      }
    };

    fetchOrders();
  }, []);

  if (orders === null) return <CircularProgress sx={{ display: 'block', margin: 'auto', mt: 5 }} />;
  if (orders.length === 0) return <Typography align="center" variant="h6">You have no orders.</Typography>;

  return (
    <Layout>
      <Container maxWidth="md">
        <Typography variant="h4" align="center" gutterBottom>
          Your Orders
        </Typography>
        {orders.map((order) => (
          <Card variant="outlined" key={order._id} sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6">Order ID: {order._id}</Typography>
              <Typography variant="body2">Date: {new Date(order.createdAt).toLocaleDateString()}</Typography>
              <Divider sx={{ my: 2 }} />
              <List>
                {order.items.map((item) => (
                  <ListItem key={item.product._id}>
                    <ListItemText primary={item.product.name} secondary={`Quantity: ${item.quantity}`} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        ))}
      </Container>
    </Layout>
  );
};

export default OrdersPage;
