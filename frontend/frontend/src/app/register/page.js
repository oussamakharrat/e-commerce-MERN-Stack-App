'use client';

import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import Layout from '../components/Layout';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message);
      }

      alert('Registration successful! You can now log in.');
      // Optionally redirect to login page
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Layout>
      <Container maxWidth="sm" className="mt-8">
        <Typography variant="h4" className="text-3xl font-bold mb-4">Register</Typography>
        {error && <Typography color="error">{error}</Typography>}
        <form onSubmit={handleRegister}>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" color="primary" className="mt-4">
            Register
          </Button>
        </form>
      </Container>
    </Layout>
  );
};

export default RegisterPage;
