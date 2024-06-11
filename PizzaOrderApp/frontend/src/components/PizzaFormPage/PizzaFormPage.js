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
import PizzaFormHeader from './PizzaFormHeader';
import Slider from '@mui/material/Slider';
import Checkbox from '@mui/material/Checkbox';
const BASE_PIZZA_PRICE = 2;
const PizzaFormPage = () => {

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation();
    const { orderDetails } = location.state;

    const [formData, setFormData] = useState({});
    const [totalPrice, setTotalPrice] = useState(BASE_PIZZA_PRICE);
    const { addToCart } = useOrder();
    const { cart } = useOrder();
    const { ingredients } = useOrder();
    const { clearOrder } = useOrder();

    console.log('Ingredients:', ingredients);
    console.log('FormData:', formData);


    useEffect(() => {
        setLoading(true);
        if (ingredients.length > 0) {

            const initialFormData = ingredients.reduce((acc, ingredient) => {
                acc[ingredient.name] = { quantity: 0, price: ingredient.price, checked: false };
                return acc;
            }, {});
            setFormData(initialFormData);
            setLoading(false);
        }
        else {
            alert('Failed to fetch ingredients. Please try again later. returning you home.');
            navigate('/');
        }
    }, [ingredients,navigate]);  // Depend on ingredients


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
        // Create a new object with all quantities set to 0 and checked to false
        const resetData = Object.keys(formData).reduce((acc, key) => {
            acc[key] = { ...formData[key], quantity: 0, checked: false };
            return acc;
        }, {});
    
        setFormData(resetData);
    
        // Optionally reset the total price
        setTotalPrice(BASE_PIZZA_PRICE);
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


    const handleChange = (id, value, checked) => {
        setFormData(prevFormData => {
            const newFormData = {
                ...prevFormData,
                [id]: {
                    ...prevFormData[id],
                    quantity: checked ? value : 0,
                    checked: checked
                }
            };
    
            // Calculate the new total price right here inside setFormData
            const newTotalPrice = Object.values(newFormData).reduce((acc, ingredient) => {
                return acc + (ingredient.checked ? ingredient.price * ingredient.quantity : 0);
            }, 0);
    
            setTotalPrice(newTotalPrice+BASE_PIZZA_PRICE);
    
            return newFormData;
        });
    };
    



    return (
        <Box>
            {loading ? (
                <Box display="flex" justifyContent="center" alignitems="center" minHeight="100vh">
                    <CircularProgress />
                </Box>
            ) : (
                <Box>
                    <PizzaFormHeader name={orderDetails.customerInfo.firstName} address={orderDetails.customerInfo.address} />
                    <Card sx={{ m: 2 }}>
                        <CardContent>
                            <Grid container spacing={2} justifyContent="center">
                                <Grid item xs={12} display="flex" justifyContent="center">
                                <Typography variant="h5">Total Price: ${totalPrice.toFixed(2)}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={10} md={8} lg={6} justifyContent="center">
                                    <form onSubmit={handleSubmit}>
                                        {ingredients.map(ingredient => (
                                            <Grid container spacing={1} key={ingredient.name} alignItems="center">
                                                <Grid item xs={2}>
                                                    <img src={ingredient.imagePath} loading="lazy" alt={ingredient.name} style={{ width: '50px', height: '50px' }} />
                                                </Grid>
                                                <Grid item xs={8}>
                                                    <Typography marginBottom={5} variant="body1">{`${ingredient.name} - $${ingredient.price}`}</Typography>
                                                    <Slider
                                                        disabled={!formData[ingredient.name]?.checked}
                                                        value={formData[ingredient.name]?.quantity || 0}
                                                        onChange={(e, value) => handleChange(ingredient.name, value, true)}
                                                        aria-labelledby="input-slider"
                                                        valueLabelDisplay="on"
                                                        step={1}
                                                        marks
                                                        min={0}
                                                        max={3}
                                                    />
                                                </Grid>
                                                <Grid item xs={2}>
                                                    <Checkbox
                                                        checked={formData[ingredient.name]?.checked || false}
                                                        onChange={(e) => handleChange(ingredient.name, formData[ingredient.name].quantity, e.target.checked)}
                                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                                    />
                                                </Grid>
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