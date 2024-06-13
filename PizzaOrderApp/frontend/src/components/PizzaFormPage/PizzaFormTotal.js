import React from 'react';
import { Grid, Typography } from '@mui/material';

/**
 * Renders the total price for the current pizza.
 * 
 * @component
 * @param {Object} props - The component props
 * @param {number} props.totalPrice - The total price of the current pizza
 * @returns {JSX.Element} The rendered PizzaFormTotal component
 */
const PizzaFormTotal = ({ totalPrice }) => {
    return (
        <Grid container justifyContent="center" sx={{ marginBottom: 5 }}>
            <Grid item xs={12}>
                <Typography variant="h5" textAlign="center">
                    Current Pizza Total Price: ${totalPrice.toFixed(2)}
                </Typography>
            </Grid>
            {totalPrice === 2.00 && (
                <Grid item xs={12}>
                    <Typography variant="h6" textAlign="center" sx={{ marginTop: 2 }}>
                        Currently, your pizza is "blank", which means sauce and cheese only.
                    </Typography>
                </Grid>
            )}
        </Grid>
    );
}

export default PizzaFormTotal;
