// components/Layout.js

'use client';

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Layout = ({ children }) => {
  const router = useRouter();
  const { pathname } = router;

  const isActive = (path) => pathname === path;

  return (
    <Box className="flex flex-col min-h-screen">
      <AppBar 
        position="sticky" 
        sx={{ 
          backgroundColor: '#1E2A38', // Dark blue background
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Soft shadow
        }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1, color: '#F4F4F9' }}>
            Luxury E-Commerce
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Link href="/" passHref>
              <Button 
                color="inherit" 
                sx={{ 
                  color: isActive('/') ? '#FFD700' : '#F4F4F9', // Gold for active, light text for inactive
                  '&:hover': {
                    color: '#FFD700', // Gold color on hover
                    backgroundColor: 'transparent',
                  },
                }}
              >
                Home
              </Button>
            </Link>
            <Link href="/products" passHref>
              <Button 
                color="inherit" 
                sx={{ 
                  color: isActive('/products') ? '#FFD700' : '#F4F4F9', // Gold for active, light text for inactive
                  '&:hover': {
                    color: '#FFD700', // Gold color on hover
                    backgroundColor: 'transparent',
                  },
                }}
              >
                Products
              </Button>
            </Link>
            <Link href="/cart" passHref>
              <Button 
                color="inherit" 
                sx={{ 
                  color: isActive('/cart') ? '#FFD700' : '#F4F4F9', // Gold for active, light text for inactive
                  '&:hover': {
                    color: '#FFD700', // Gold color on hover
                    backgroundColor: 'transparent',
                  },
                }}
              >
                Cart
              </Button>
            </Link>
            <Link href="/login" passHref>
              <Button 
                color="inherit" 
                sx={{ 
                  color: isActive('/login') ? '#FFD700' : '#F4F4F9', // Gold for active, light text for inactive
                  '&:hover': {
                    color: '#FFD700', // Gold color on hover
                    backgroundColor: 'transparent',
                  },
                }}
              >
                Login
              </Button>
            </Link>
            <Link href="/register" passHref>
              <Button 
                color="inherit" 
                sx={{ 
                  color: isActive('/register') ? '#FFD700' : '#F4F4F9', // Gold for active, light text for inactive
                  '&:hover': {
                    color: '#FFD700', // Gold color on hover
                    backgroundColor: 'transparent',
                  },
                }}
              >
                Register
              </Button>
            </Link>
            <Link href="/orders" passHref>
              <Button 
                color="inherit" 
                sx={{ 
                  color: isActive('/orders') ? '#FFD700' : '#F4F4F9', // Gold for active, light text for inactive
                  '&:hover': {
                    color: '#FFD700', // Gold color on hover
                    backgroundColor: 'transparent',
                  },
                }}
              >
                Orders
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
        {children}
      </Container>
      <Box component="footer" sx={{ backgroundColor: '#f5f5f5', py: 3, textAlign: 'center' }}>
        <Typography>&copy; {new Date().getFullYear()} Luxury E-Commerce</Typography>
      </Box>
    </Box>
  );
};

export default Layout;
