import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

function ExpenseItem({ expense }) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="subtitle1">Category: {expense.category}</Typography>
        <Typography variant="body2">Amount: ₹{expense.amount}</Typography>
        <Typography variant="body2">
          Description: {expense.description || 'No description'}
        </Typography>
        <Typography variant="caption">
          Date: {new Date(expense.date).toLocaleDateString()}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default ExpenseItem;
