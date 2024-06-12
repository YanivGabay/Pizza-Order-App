import React from 'react'
import { Grid, Typography } from '@mui/material'




const PizzaFormTotal = ({ totalPrice }) => {
    return (
        <Grid marginBlockEnd={5} container justifyContent="center">
          <Grid item xs={12}>
            <Typography variant="h5" textAlign="center">
              Total Price: ${totalPrice.toFixed(2)}
            </Typography>
          </Grid>
          {totalPrice === 2.00 && (
            <Grid item xs={12}>
              <Typography variant="h6" textAlign="center" style={{ marginTop: '10px' }}>
                Currently, your pizza is "blank", which means sauce and cheese only.
              </Typography>
            </Grid>
          )}
        </Grid>
      );
}

export default PizzaFormTotal;
