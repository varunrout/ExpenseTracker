import React, { useState } from 'react';
import axios from '../../axiosConfig';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function CreateGroup() {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/groups', { name });
      console.log('Group created:', res.data);
      navigate('/groups');
    } catch (error) {
      console.error('Error creating group:', error);
      alert('Failed to create group.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Create New Group
      </Typography>
      <Box component="form" onSubmit={handleCreate} sx={{ mt: 2 }}>
        <TextField
          label="Group Name"
          fullWidth
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          margin="normal"
        />
        <Button type="submit" variant="contained">
          Create Group
        </Button>
      </Box>
    </Container>
  );
}

export default CreateGroup;
