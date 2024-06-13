import React from 'react'

import { Typography, Container, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
/**
 * NotFound component to display a 404 page with enhanced UI elements.
 * 
 * @component
 * @returns {JSX.Element} The rendered component
 */
const NotFound = () => {

    const navigate = useNavigate();
    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <Container style={{ textAlign: 'center', marginTop: '50px' }}>
            <Typography variant="h1" component="h1" gutterBottom>
                404
            </Typography>
            <Typography variant="h5" component="h2" gutterBottom>
                Page Not Found
            </Typography>
            <Typography variant="body1" component="p" gutterBottom>
                The page you are looking for does not exist.
            </Typography>
            <Button variant="contained" color="primary" onClick={handleGoHome}>
                Go to Home
            </Button>
        </Container>
    );
}


export default NotFound