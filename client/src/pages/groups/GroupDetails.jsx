import React, { useState, useEffect } from 'react';
import axios from '../../axiosConfig';
import { useParams } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  CircularProgress,
  Button,
  Grid,
} from '@mui/material';

function GroupDetails() {
  const { groupId } = useParams();
  const [group, setGroup] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGroupData = async () => {
    try {
      // Fetch group details from /api/groups/group/:groupId
      const groupRes = await axios.get(`/groups/group/${groupId}`);
      setGroup(groupRes.data);

      // Fetch group expenses from /api/groups/expenses/group/:groupId
      const expensesRes = await axios.get(`/groups/expenses/group/${groupId}`);
      setExpenses(Array.isArray(expensesRes.data) ? expensesRes.data : []);
    } catch (error) {
      console.error('Error fetching group data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroupData();
  }, [groupId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!group) {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h5">Group not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        {group.name} (Group ID: {group._id})
      </Typography>
      <Typography variant="h6" gutterBottom>
        Members
      </Typography>
      {group.members && group.members.length > 0 ? (
        group.members.map((member) => (
          <Typography key={member._id || member} variant="body1">
            {member.name || member}
          </Typography>
        ))
      ) : (
        <Typography variant="body1">No members listed</Typography>
      )}
      <Typography variant="h6" sx={{ mt: 4 }}>
        Group Expenses
      </Typography>
      {expenses.length === 0 ? (
        <Typography>No expenses for this group yet.</Typography>
      ) : (
        <Grid container spacing={2}>
          {expenses.map((exp) => (
            <Grid item xs={12} sm={6} md={4} key={exp._id}>
              <Card>
                <CardContent>
                  <Typography variant="subtitle1" gutterBottom>
                    {exp.category}: ₹{exp.amount}
                  </Typography>
                  <Typography variant="body2">
                    {exp.description || 'No description'}
                  </Typography>
                  <Typography variant="caption">
                    {new Date(exp.date).toLocaleString()}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <Button
        variant="contained"
        sx={{ mt: 2 }}
        onClick={() => {
          // Here you would navigate to an Add Expense form that supports groupId, if implemented
        }}
      >
        Add Group Expense
      </Button>
    </Container>
  );
}

export default GroupDetails;
