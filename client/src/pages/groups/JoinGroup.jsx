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

function JoinGroup() {
  const [groupId, setGroupId] = useState('');
  const navigate = useNavigate();

  const handleJoin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/groups/join', { groupId });
      console.log('Joined group:', res.data.group);
      navigate('/groups');
    } catch (error) {
      console.error('Error joining group:', error);
      alert('Failed to join group.');
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Join Group
      </Typography>
      <Box component="form" onSubmit={handleJoin} sx={{ mt: 2 }}>
        <TextField
          label="Group ID"
          fullWidth
          required
          value={groupId}
          onChange={(e) => setGroupId(e.target.value)}
          margin="normal"
        />
        <Button type="submit" variant="contained">
          Join Group
        </Button>
      </Box>
    </Container>
  );
}

export default JoinGroup;
