

import {Card, CardContent, Typography} from "@mui/material";
import Box from "@mui/material/Box";
import {useLocation} from "react-router-dom";
import {useOrder} from "../../context/OrderContext";


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
          <Typography variant="h6">Total Price: {orderDetails.orderTotal}</Typography>
          <Typography variant="h6">Pizzas:</Typography>
          <ul>
            {orderDetails.pizzas.map((pizza, index) => (
              <li key={pizza.id}>
                <Typography variant="body1">Pizza {index + 1} - ${pizza.price.toFixed(2)}</Typography>
                <ul>
                  {pizza.ingredients.map(ingredient => (
                    <li key={ingredient.id}>
                      {getIngredientNameById(ingredient.id)}: {ingredient.quantity} units
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </Box>
  );
};


export default OrderDetails