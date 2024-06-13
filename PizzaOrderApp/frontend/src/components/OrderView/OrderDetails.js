import { Card, CardContent, Typography, Box, List, ListItem, ListItemText, Divider } from "@mui/material";
import { useLocation } from "react-router-dom";
import { useOrder } from "../../context/OrderContext";
import React from "react";
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

  return (
    <Box>
      <Card sx={{ m: 2 }}>
        <CardContent>
          <Typography variant="h4">Order Added Successfully</Typography>
          <Typography variant="h4">Order Details:</Typography>
        </CardContent>
      </Card>

      <Card sx={{ m: 2 }}>
        <CardContent>
          <Typography variant="h6">Order Code: {orderDetails.orderCode}</Typography>
          <Typography variant="h6">Total Price: ${orderDetails.orderTotal.toFixed(2)}</Typography>
          <Typography variant="h6">Pizzas:</Typography>
          <List>
            {orderDetails.pizzas.map((pizza, index) => (
              <React.Fragment key={pizza.id}>
                <ListItem>
                  <ListItemText primary={`Pizza ${index + 1} - $${pizza.price.toFixed(2)}`} />
                </ListItem>
                <List component="div" disablePadding>
                  {pizza.ingredients.map(ingredient => (
                    <ListItem key={ingredient.id} sx={{ pl: 4 }}>
                      <ListItemText primary={`${getIngredientNameById(ingredient.id)}: ${ingredient.quantity} units`} />
                    </ListItem>
                  ))}
                </List>
                {index < orderDetails.pizzas.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </CardContent>
      </Card>
    </Box>
  );
};

export default OrderDetails;
