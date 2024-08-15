// components/Layout.js

'use client';

import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Layout = ({ children }) => {
  const router = useRouter();
  const { pathname } = router;

  // State to track the active link
  const [activeLink, setActiveLink] = useState(pathname);

  const handleLinkClick = (path) => {
    setActiveLink(path);
    router.push(path); // Navigate to the clicked link
  };

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
            LeoNAF
          </Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button 
              color="inherit" 
              sx={{ 
                color: activeLink === '/' ? '#FFD700' : '#F4F4F9', // Gold for active, light text for inactive
                '&:hover': {
                  color: '#FFD700', // Gold color on hover
                  backgroundColor: 'transparent',
                },
              }}
              onClick={() => handleLinkClick('/')}
            >
              Home
            </Button>
            <Button 
              color="inherit" 
              sx={{ 
                color: activeLink === '/products' ? '#FFD700' : '#F4F4F9', // Gold for active, light text for inactive
                '&:hover': {
                  color: '#FFD700', // Gold color on hover
                  backgroundColor: 'transparent',
                },
              }}
              onClick={() => handleLinkClick('/products')}
            >
              Products
            </Button>
            <Button 
              color="inherit" 
              sx={{ 
                color: activeLink === '/cart' ? '#FFD700' : '#F4F4F9', // Gold for active, light text for inactive
                '&:hover': {
                  color: '#FFD700', // Gold color on hover
                  backgroundColor: 'transparent',
                },
              }}
              onClick={() => handleLinkClick('/cart')}
            >
              Cart
            </Button>
            <Button 
              color="inherit" 
              sx={{ 
                color: activeLink === '/login' ? '#FFD700' : '#F4F4F9', // Gold for active, light text for inactive
                '&:hover': {
                  color: '#FFD700', // Gold color on hover
                  backgroundColor: 'transparent',
                },
              }}
              onClick={() => handleLinkClick('/login')}
            >
              Login
            </Button>
            <Button 
              color="inherit" 
              sx={{ 
                color: activeLink === '/register' ? '#FFD700' : '#F4F4F9', // Gold for active, light text for inactive
                '&:hover': {
                  color: '#FFD700', // Gold color on hover
                  backgroundColor: 'transparent',
                },
              }}
              onClick={() => handleLinkClick('/register')}
            >
              Register
            </Button>
            <Button 
              color="inherit" 
              sx={{ 
                color: activeLink === '/orders' ? '#FFD700' : '#F4F4F9', // Gold for active, light text for inactive
                '&:hover': {
                  color: '#FFD700', // Gold color on hover
                  backgroundColor: 'transparent',
                },
              }}
              onClick={() => handleLinkClick('/orders')}
            >
              Orders
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
        {children}
      </Container>
      <Box component="footer" sx={{ backgroundColor: '#f5f5f5', py: 3, textAlign: 'center' }}>
        <Typography>&copy; {new Date().getFullYear()} LeoNAF</Typography>
      </Box>
    </Box>
  );
};

export default Layout;
