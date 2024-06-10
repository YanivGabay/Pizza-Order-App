import React, {useState} from 'react'

import {Card, CardContent, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {useLocation} from "react-router-dom";
const OrderDetails = () => {

  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const { orderDetails } = location.state;

  return (
    <Box>
      <Typography variant="h4">Order Details</Typography>
      <Card>
        <CardContent>
          <Typography variant="h6">Order Code: {orderDetails.orderCode}</Typography>
          <Typography variant="h6">Total Price: {orderDetails.totalPrice}</Typography>
        
          <Typography variant="h6">Pizzas:</Typography>
          <ul>
            {orderDetails.pizzas.map(pizza => (
              <li key={pizza.id}>
                <Typography variant="body1">{pizza.name} - {pizza.price}</Typography>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

    </Box>
  )
}

export default OrderDetails