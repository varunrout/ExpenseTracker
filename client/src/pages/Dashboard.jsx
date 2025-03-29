import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Container, Box, Typography } from '@mui/material';

function Dashboard() {
  const { user } = useContext(AuthContext);

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, {user ? user.name : 'User'}!
        </Typography>
        <Typography variant="body1">
          This is your dashboard. Here you can view your expenses or add new ones.
        </Typography>
      </Box>
    </Container>
  );
}

export default Dashboard;
