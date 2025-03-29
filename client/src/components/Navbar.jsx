import React, { useContext } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { AuthContext } from '../context/AuthContext';
import { Box } from '@mui/material';

function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Expense Tracker
        </Typography>
        {user ? (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button component={RouterLink} to="/dashboard" color="inherit">
              Dashboard
            </Button>
            <Button component={RouterLink} to="/expenses" color="inherit">
              Expenses
            </Button>
            <Button component={RouterLink} to="/add-expense" color="inherit">
              Add Expense
            </Button>
            <Button component={RouterLink} to="/groups" color="inherit">
              My Groups
            </Button>
            <Button component={RouterLink} to="/groups/new" color="inherit">
              Create Group
            </Button>
            <Button component={RouterLink} to="/groups/join" color="inherit">
              Join Group
            </Button>
            <Button onClick={logout} color="inherit">
              Logout
            </Button>
          </Box>
        ) : (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button component={RouterLink} to="/login" color="inherit">
              Login
            </Button>
            <Button component={RouterLink} to="/register" color="inherit">
              Register
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
