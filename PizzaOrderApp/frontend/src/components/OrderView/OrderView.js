import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Card, CardContent } from '@mui/material';
import { useOrder } from '../../context/OrderContext';

const OrderView = () => {
    const [orderCode, setOrderCode] = useState('');
    const [orderDetails, setOrderDetails] = useState(null);
    const [error, setError] = useState('');
    const { getIngredientNameById } = useOrder();

    const handleInputChange = (e) => {
        setOrderCode(e.target.value);
    };

    const fetchOrderDetails = async () => {
        try {
            const response = await fetch(`/api/v1/orders/${orderCode}`);
            if (!response.ok) {
                throw new Error('Order not found');
            }
            const data = await response.json();
            setOrderDetails(data);
            setError('');
        } catch (err) {
            setError(err.message);
            setOrderDetails(null);
        }
    };

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
                        <Typography>Pizzas:</Typography>
                        <ul>
                            {orderDetails.pizzas.map((pizza, index) => (
                                <li key={pizza.id}>
                                    <Typography>Pizza {index + 1} - ${pizza.price.toFixed(2)}</Typography>
                                    <ul>
                                        {pizza.ingredients.map((ingredient) => (
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
            )}
        </Box>
    );
};

export default OrderView;
