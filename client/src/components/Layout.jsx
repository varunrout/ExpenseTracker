import React from 'react';
import { Container, Box } from '@mui/material';

const Layout = ({ children }) => {
    return (
        <Box
            sx={{
                backgroundColor: 'background.default',
                minHeight: '100vh',
                pt: 2,
                pb: 2,
            }}
        >
            <Container maxWidth="lg">
                {children}
            </Container>
        </Box>
    );
};

export default Layout;
