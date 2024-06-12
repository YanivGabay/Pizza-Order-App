import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
const PizzaFormHeader = ({name,address}) => {
    const navigate = useNavigate();
    

    return (
        <Box >

       
        <Card sx={{ m: 2 }}>
            <CardContent>
                <Typography variant="h4" align="center">Choose Your Pizza</Typography>
                <Typography variant="body1" align="center">Welcome {name}</Typography>
                <Typography variant="body1" align="center">You choose this address: {address}</Typography>
                <Typography variant="body1" align="center">Please select the ingredients for your pizza</Typography>
                <Button align="center" type="submit" onClick={()=> navigate(-1)} >Back</Button>
            </CardContent>
        </Card>
        </Box>
    )
}

export default PizzaFormHeader