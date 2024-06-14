import { Card, CardContent, Typography, Box, Grid, ListItem, ListItemText, Divider, Button } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useOrder } from "../../context/OrderContext";
import React from "react";
import {  useNavigate } from 'react-router-dom';
/**
 * Renders the order details.
 * 
 * @component
 * @returns {JSX.Element} The rendered OrderDetails component
 */
const OrderDetails = () => {
  const location = useLocation();
  const { orderDetails } = location.state || {}; // Default to an empty object to avoid undefined errors
  const { getIngredientNameById } = useOrder();
  const navigate = useNavigate();
  return (
    
    <Box m={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <Card >

        <CardContent>
        <Typography style={{ color: 'green' }} variant="h4">Order Added Successfully</Typography>
        </CardContent>
          <CardContent>
         
          </CardContent>
        
       
      </Card>

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Card sx={{ m: 2 }}>
            <CardContent>
              <Typography variant="h4" align="center">Order Details</Typography>
              <Typography  variant="h6" align="center">Order Code: {orderDetails.orderCode}</Typography>
              <Typography variant="h6" align="center">Total Price: ${orderDetails.orderTotal.toFixed(2)}</Typography>
              <Typography variant="h6" align="center">Pizzas:</Typography>
              {orderDetails.pizzas && orderDetails.pizzas.map((pizza, index) => (
                <React.Fragment key={index}>
                  <Typography>{`Pizza ${index + 1}: $${pizza.price.toFixed(2)}`}</Typography>
                  {pizza.ingredients.map(ingredient => (
                    <Typography key={ingredient.id}>{`${getIngredientNameById(ingredient.id)}: ${ingredient.quantity}`}</Typography>
                  ))}
                </React.Fragment>
              ))}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card sx={{ m: 2 }}>
            <CardContent>
              <Typography variant="h4" align="center">Customer Details</Typography>
              <Typography variant="h6" align="center">Name: {orderDetails.customerInfo.firstName} {orderDetails.customerInfo.lastName}</Typography>
              <Typography variant="h6" align="center">Phone: {orderDetails.customerInfo.phoneNumber}</Typography>
              <Typography variant="h6" align="center">Address: {orderDetails.customerInfo.address}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Button variant="contained" color="primary" onClick={() => navigate("/")}>Back Home</Button>
    </Box>
 
  );
};

export default OrderDetails;
