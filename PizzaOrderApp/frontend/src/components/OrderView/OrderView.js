import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Card, CardContent, List, ListItem, ListItemText, Divider } from '@mui/material';
import { useOrder } from '../../context/OrderContext';

/**
 * Renders the OrderView component.
 * 
 * @component
 * @returns {JSX.Element} The rendered OrderView component
 */
const OrderView = () => {
    const [orderCode, setOrderCode] = useState('');
    const [orderDetails, setOrderDetails] = useState(null);
    const [error, setError] = useState('');
    const { getIngredientNameById } = useOrder();

    /**
     * Handles the change of the order code input field.
     * 
     * @param {Event} e - The change event
     */
    const handleInputChange = (e) => {
        setOrderCode(e.target.value);
    };

    /**
     * Fetches the order details from the backend.
     */
    const fetchOrderDetails = async () => {
        try {
            const response = await fetch(`/api/v1/orders/${orderCode}`);
            if (!response.ok) {
                setError('Failed to fetch order details. Please check the order code and try again.');
            }
            const data = await response.json();
            setOrderDetails(data);
            setError('');
        } catch (err) {
            setError(err.message);
            setOrderDetails(null);
        }
    };

    /**
     * Handles the form submission to fetch order details.
     * 
     * @param {Event} e - The submit event
     */
    const handleSubmit = (e) => {
        e.preventDefault();
        fetchOrderDetails();
    };

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                Order View
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Enter your order code"
                    value={orderCode}
                    onChange={handleInputChange}
                    variant="outlined"
                    margin="normal"
                />
                <Button type="submit" variant="contained" color="primary">
                    Fetch Order
                </Button>
            </form>
            {error && <Typography color="error">{error}</Typography>}
            {orderDetails && (
                <Card variant="outlined" sx={{ mt: 2 }}>
                    <CardContent>
                        <Typography variant="h6">Order Details:</Typography>
                        <Typography>Order Code: {orderDetails.orderCode}</Typography>
                        <Typography>Total Price: ${orderDetails.orderTotal.toFixed(2)}</Typography>
                        <Typography variant="h6">Pizzas:</Typography>
                        <List>
                            {orderDetails.pizzas.map((pizza, index) => (
                                <React.Fragment key={pizza.id}>
                                    <ListItem>
                                        <ListItemText primary={`Pizza ${index + 1} - $${pizza.price.toFixed(2)}`} />
                                    </ListItem>
                                    <List component="div" disablePadding>
                                        {pizza.ingredients.map((ingredient) => (
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
            )}
        </Box>
    );
};

export default OrderView;
