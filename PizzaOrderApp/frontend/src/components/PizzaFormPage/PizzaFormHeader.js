import React from 'react'
import { Card, CardContent, Typography } from '@mui/material'

const PizzaFormHeader = ({name,address}) => {

    

    return (
        <Card sx={{ m: 2 }}>
            <CardContent>
                <Typography variant="h4" align="center">Choose Your Pizza</Typography>
                <Typography variant="body1" align="center">Welcome {name}</Typography>
                <Typography variant="body1" align="center">You choose this address: {address}</Typography>
                <Typography variant="body1" align="center">Please select the ingredients for your pizza</Typography>
            </CardContent>
        </Card>
    )
}

export default PizzaFormHeader