// components/Layout.js

'use client';

import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container, useMediaQuery } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';

const Layout = ({ children }) => {
  const router = useRouter();
  const { pathname } = router;
  const isMobile = useMediaQuery('(max-width:600px)');
  
  const isActive = (path) => pathname === path;

  return (
    <Box className="flex flex-col min-h-screen">
      <AppBar 
        position="sticky" 
        sx={{ 
          backgroundColor: '#121212', // Dark background for modern look
          boxShadow: 'none', // Remove shadow for cleaner appearance
          borderBottom: '1px solid #333', // Subtle border for separation
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ flexGrow: 1, color: '#ffffff', fontWeight: 'bold' }}>
            LeoNAF
          </Typography>
          {isMobile ? (
            <IconButton color="inherit">
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Link href="/" passHref>
                <Button 
                  color="inherit" 
                  sx={{ 
                    color: isActive('/') ? '#FFAB00' : '#E0E0E0', // Gold for active, light grey for inactive
                    '&:hover': {
                      color: '#FFAB00', // Gold color on hover
                      backgroundColor: 'transparent',
                    },
                    fontWeight: isActive('/') ? 'bold' : 'normal',
                  }}
                >
                  Home
                </Button>
              </Link>
              <Link href="/products" passHref>
                <Button 
                  color="inherit" 
                  sx={{ 
                    color: isActive('/products') ? '#FFAB00' : '#E0E0E0', // Gold for active, light grey for inactive
                    '&:hover': {
                      color: '#FFAB00', // Gold color on hover
                      backgroundColor: 'transparent',
                    },
                    fontWeight: isActive('/products') ? 'bold' : 'normal',
                  }}
                >
                  Products
                </Button>
              </Link>
              <Link href="/cart" passHref>
                <Button 
                  color="inherit" 
                  sx={{ 
                    color: isActive('/cart') ? '#FFAB00' : '#E0E0E0', // Gold for active, light grey for inactive
                    '&:hover': {
                      color: '#FFAB00', // Gold color on hover
                      backgroundColor: 'transparent',
                    },
                    fontWeight: isActive('/cart') ? 'bold' : 'normal',
                  }}
                >
                  Cart
                </Button>
              </Link>
              <Link href="/login" passHref>
                <Button 
                  color="inherit" 
                  sx={{ 
                    color: isActive('/login') ? '#FFAB00' : '#E0E0E0', // Gold for active, light grey for inactive
                    '&:hover': {
                      color: '#FFAB00', // Gold color on hover
                      backgroundColor: 'transparent',
                    },
                    fontWeight: isActive('/login') ? 'bold' : 'normal',
                  }}
                >
                  Login
                </Button>
              </Link>
              <Link href="/register" passHref>
                <Button 
                  color="inherit" 
                  sx={{ 
                    color: isActive('/register') ? '#FFAB00' : '#E0E0E0', // Gold for active, light grey for inactive
                    '&:hover': {
                      color: '#FFAB00', // Gold color on hover
                      backgroundColor: 'transparent',
                    },
                    fontWeight: isActive('/register') ? 'bold' : 'normal',
                  }}
                >
                  Register
                </Button>
              </Link>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Container component="main" sx={{ flexGrow: 1, py: 4 }}>
        {children}
      </Container>
      <Box component="footer" sx={{ backgroundColor: '#1C1C1C', py: 3, textAlign: 'center', color: '#E0E0E0' }}>
        <Typography>&copy; {new Date().getFullYear()} LeoNAF</Typography>
      </Box>
    </Box>
  );
};

export default Layout;
