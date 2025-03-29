import React, { useContext, useEffect } from 'react';
import { ExpenseContext } from '../context/ExpenseContext';
import { Container, Box, Typography, CircularProgress, Grid } from '@mui/material';
import ExpenseItem from '../components/ExpenseItem';

function Expenses() {
  const { expenses, loading, fetchExpenses } = useContext(ExpenseContext);

  useEffect(() => {
    fetchExpenses();
  }, []);

  if (loading) {
    return (
      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Your Expenses
      </Typography>
      {expenses.length === 0 ? (
        <Typography>No expenses found.</Typography>
      ) : (
        <Grid container spacing={2}>
          {expenses.map((expense) => (
            <Grid item xs={12} sm={6} md={4} key={expense._id}>
              <ExpenseItem expense={expense} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default Expenses;
