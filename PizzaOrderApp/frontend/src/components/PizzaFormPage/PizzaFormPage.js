import React from 'react'
import { Box, Grid } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { Card } from '@mui/material';
import { CardContent } from '@mui/material';
import { Typography } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const PizzaFormPage = () => {

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();



  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
  }

  const handleReset = () => {
    // Handle form reset
  }


  return (
    <Box>
        {loading ? (
            <Box display="flex" justifyContent="center" alignitems="center" minHeight="100vh">
                <CircularProgress />  // Loading indicator
            </Box>
        ) : (
            <Box>
                <Card sx={{ m: 2 }}>
                    <CardContent>
                        <Typography variant="h4" align="center">Choose Your Pizza</Typography>
                        <Typography variant="body1" align="center">Please fill out the form below to place your order.</Typography>
                    </CardContent>
                </Card>
                <Card sx={{ m: 2 }}>
                    <CardContent>
                        <Grid container spacing={2} justifyContent="center">
                            <Grid item xs={12} sm={10} md={8} lg={6}>
                                <form onSubmit={handleSubmit}>
                                 
                                    <Grid item xs={12} display="flex" justifyContent="center">
                                        <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, m:2 }}>Submit</Button>
                                        <Button type="reset" onClick={handleReset} variant="contained" sx={{ mt: 3, mb: 2, m:2 }}>Reset</Button>
                                    </Grid>
                                   
                                </form>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            </Box>
        )}
    </Box>
)
}

export default PizzaFormPage