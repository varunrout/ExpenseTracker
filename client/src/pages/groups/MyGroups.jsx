import React, { useState, useEffect } from 'react';
import axios from '../../axiosConfig';
import {
  Container,
  Typography,
  Box,
  CircularProgress,
  Card,
  CardContent,
  Button,
  Grid,
} from '@mui/material';
import { Link } from 'react-router-dom';

function MyGroups() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchGroups = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/groups/mine');
      setGroups(res.data);
    } catch (error) {
      console.error('Error fetching groups:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Groups
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <Button variant="contained" component={Link} to="/groups/new">
          Create Group
        </Button>
        <Button variant="outlined" component={Link} to="/groups/join">
          Join Group
        </Button>
      </Box>
      {groups.length === 0 ? (
        <Typography>No groups found. Create or join one!</Typography>
      ) : (
        <Grid container spacing={2}>
          {groups.map((group) => (
            <Grid item xs={12} sm={6} md={4} key={group._id}>
              <Card>
                <CardContent>
                  <Typography variant="h6">{group.name}</Typography>
                  <Typography variant="body2">
                    Members: {group.members?.length || 0}
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    sx={{ mt: 1 }}
                    component={Link}
                    to={`/groups/group/${group._id}`}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}

export default MyGroups;
