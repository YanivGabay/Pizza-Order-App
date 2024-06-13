import React from 'react';
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

/**
 * Renders the header for the pizza form.
 * 
 * @component
 * @param {Object} props - The component props
 * @param {string} props.name - The name of the user
 * @param {string} props.address - The address of the user
 * @returns {JSX.Element} The rendered PizzaFormHeader component
 */
const PizzaFormHeader = ({ name, address }) => {
    const navigate = useNavigate();

    return (
        <Box>
            <Card sx={{ m: 2 }}>
                <CardContent>
                    <Typography variant="h4" align="center">Choose Your Pizza</Typography>
                    <Typography variant="body1" align="center">Welcome {name}</Typography>
                    <Typography variant="body1" align="center">You chose this address: {address}</Typography>
                    <Typography variant="body1" align="center">Please select the ingredients for your pizza</Typography>
                    <Button align="center" variant="contained" color="primary" onClick={() => navigate(-1)}>
                        Back
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
}

export default PizzaFormHeader;
