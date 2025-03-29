import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ExpenseContext } from '../context/ExpenseContext';
import axios from '../axiosConfig';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';

function AddExpense() {
  const { addExpense } = useContext(ExpenseContext);
  const navigate = useNavigate();

  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');

  const [groups, setGroups] = useState([]);
  const [groupId, setGroupId] = useState('');

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await axios.get('/groups/mine');
        setGroups(res.data);
      } catch (error) {
        console.error('Error fetching groups:', error);
      }
    };
    fetchGroups();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const expenseData = {
      category,
      amount: parseFloat(amount),
      description,
      date: new Date(),
    };
    if (groupId) {
      expenseData.groupId = groupId;
    }
    await addExpense(expenseData);
    navigate('/expenses');
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" component="h1" sx={{ mb: 2 }}>
          Add Expense
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <TextField
            margin="normal"
            fullWidth
            label="Description (optional)"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="group-select-label">Group</InputLabel>
            <Select
              labelId="group-select-label"
              label="Group"
              value={groupId}
              onChange={(e) => setGroupId(e.target.value)}
            >
              <MenuItem value="">
                <em>No Group</em>
              </MenuItem>
              {groups.map((g) => (
                <MenuItem key={g._id} value={g._id}>
                  {g.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Add
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default AddExpense;
