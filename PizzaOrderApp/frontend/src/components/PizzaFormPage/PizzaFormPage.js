import React, { useEffect } from 'react'
import { Box, Grid } from '@mui/material';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import { Card } from '@mui/material';
import { CardContent } from '@mui/material';
import { Typography } from '@mui/material';
import { CircularProgress } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { useOrder } from '../../context/OrderContext';

const PizzaFormPage = () => {

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const { orderDetails } = location.state;

    const [formData, setFormData] = useState({});

    const { addToCart } = useOrder();
    const {cart} = useOrder();
    const { ingredients } = useOrder();
    const { clearOrder } = useOrder();
    console.log('Ingredients:', ingredients);
    console.log('FormData:', formData);

  
    useEffect(() => {
        setLoading(true);
        if (ingredients.length > 0) {
            const initialFormData = ingredients.reduce((acc, ingredient) => {
                acc[ingredient.name] = { quantity: 0, price: ingredient.price };
                return acc;
            }, {});
            setFormData(initialFormData);
            setLoading(false);
        }
        else {
            alert('Failed to fetch ingredients. Please try again later.');
             }
    }, [ingredients]);  // Depend on ingredients
    
 
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (cart.length === 0) {
            alert('Please add at least one pizza before finishing the order.');
            return;
        }
        console.log(JSON.stringify({ pizzas: cart }));

        setLoading(true);
        try {
            const response = await fetch(`/api/v1/orders/${orderDetails.orderCode}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(cart.map(pizza => ({
                    id: pizza.id,
                    ingredients: pizza.ingredients.map(ingredient => ({
                        id: ingredient.id,
                        quantity: ingredient.quantity
                    }))
                })))
            });
            
          
            const result = await response.json();
            if (response.ok) {
                clearOrder();
                navigate(`/success/${result.orderCode}`, { state: { orderDetails: result } });
            } else {
                alert('Failed to update order: ' + (result.error || 'Unknown error'));
                setErrors(result.errors || {});
            }
        } catch (error) {
            console.error('Failed to submit order:', error);
            alert('An error occurred while submitting your order.');
        }
        setLoading(false);
    }
    
    const validateForm = () => {
        const newErrors = {};
        ingredients.forEach(ingredient => {
            const quantity = formData[ingredient.name].quantity;
            if (quantity < 0 || quantity > 3) {  // Assuming a maximum of 3 for each ingredient
                newErrors[ingredient.name] = 'Quantity must be between 0 and 3';
            }
        });
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };
    
    const handleReset = () => {
        // Reset form to initial state
        Object.keys(formData).forEach(key => {
            formData[key].quantity = 0;
        });
        setFormData({ ...formData });
    };
    const handleAddPizza = () => {
        if (!validateForm()) return;
    
        // Create an array of selected ingredients with non-zero quantities
        const selectedIngredients = ingredients
            .filter(ingredient => formData[ingredient.name].quantity > 0)
            .map(ingredient => ({
                id: ingredient.id,
                quantity: formData[ingredient.name].quantity
            }));
    
        if (selectedIngredients.length > 0) {
            const newPizza = {
                id: Date.now(), 
                ingredients: selectedIngredients
            };
            addToCart(newPizza);
            handleReset(); // Reset form after adding to cart
        }
    };
    
    
    

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: {
                ...prevFormData[name],
                quantity: value === "" ? "" : Number(value)
            }
        }));
        validateForm();

    };
    
    
    return (
        <Box>
            {loading ? (
                <Box display="flex" justifyContent="center" alignitems="center" minHeight="100vh">
                    <CircularProgress /> 
                </Box>
            ) : (
                <Box>
                    <Card sx={{ m: 2 }}>
                        <CardContent>
                            <Typography variant="h4" align="center">Choose Your Pizza</Typography>
                            <Typography variant="body1" align="center">Welcome {orderDetails.customerInfo.firstName}</Typography>
                            <Typography variant="body1" align="center">You choose this address {orderDetails.customerInfo.address}</Typography>
                            <Typography variant="body1" align="center">Please select the ingredients for your pizza</Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ m: 2 }}>
                        <CardContent>
                            <Grid container spacing={2} justifyContent="center">
                                <Grid item xs={12} sm={10} md={8} lg={6} justifyContent="center">
                                    <form onSubmit={handleSubmit}>
                                        {ingredients.map(ingredient => (
                                            <Grid item xs={12} sm={6} key={ingredient.id}>
                                                <img src={ingredient.imagePath} alt={ingredient.name} style={{ width: 100, height: 100 }} />
                                                <TextField
                                                    key={ingredient.id}
                                                    label={`${ingredient.name} - $${ingredient.price}`}
                                                    type="number"
                                                    name={ingredient.name}
                                                    value={formData[ingredient.name].quantity} 
                                                    onChange={(e) => handleChange(e)}
                                                    error={!!errors[ingredient.name]}
                                                    helperText={errors[ingredient.name]}
                                                    inputProps={{ min: 0, max: 3 }} 
                                                    sx={{ marginBottom: 2 }}
                                                    fullWidth
                                                />

                                            </Grid>
                                        ))}
                                        <Grid item xs={12} display="flex" justifyContent="center">
                                            <Button onClick={handleAddPizza} variant="contained" sx={{ mt: 3, mb: 2, m: 2 }}>Add Pizza</Button>
                                        </Grid>
                                        <Grid item xs={12} display="flex" justifyContent="center">
                                            <Button type="submit" onClick={handleSubmit} variant="contained" sx={{ mt: 3, mb: 2, m: 2 }}>Finish Order</Button>
                                            <Button type="reset" onClick={handleReset} variant="contained" sx={{ mt: 3, mb: 2, m: 2 }}>Reset Current Pizza</Button>
                                        </Grid>

                                    </form>
                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>
                </Box>
            )}
        </Box>
    )
}

export default PizzaFormPage