import React, { useEffect, useState } from 'react';
import { Box, Grid, Button, Card, CardContent, Typography, CircularProgress, Slider, Checkbox } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useOrder } from '../../context/OrderContext';
import PizzaFormHeader from './PizzaFormHeader';
import PizzaFormTotal from './PizzaFormTotal';
import { useSnackbar } from '../../context/SnackbarContext';

const BASE_PIZZA_PRICE = 2;

/**
 * Renders the pizza form page to select ingredients for a pizza order.
 * 
 * @component
 * @returns {JSX.Element} The rendered PizzaFormPage component
 */
const PizzaFormPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({});
    const [totalPrice, setTotalPrice] = useState(BASE_PIZZA_PRICE);
    const { enqueueSnackbar } = useSnackbar();
    const { orderDetails } = location.state;
    const { addToCart, cart, ingredients, clearOrder } = useOrder();

    useEffect(() => {
        setLoading(true);
        if (ingredients.length > 0) {
            const initialFormData = ingredients.reduce((acc, ingredient) => {
                acc[ingredient.name] = { quantity: 0, price: ingredient.price, checked: false };
                return acc;
            }, {});
            setFormData(initialFormData);
            setLoading(false);
        } else {
            enqueueSnackbar('Failed to fetch ingredients. Please try again later. Returning you home.', 'error');
            navigate('/');
        }
    }, [ingredients, navigate, enqueueSnackbar]);

    /**
     * Handles form submission to finalize the order.
     * 
     * @param {Event} e - The submit event
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (cart.length === 0) {
            enqueueSnackbar('Please add at least one pizza before finishing the order.', 'error');
            return;
        }

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
                enqueueSnackbar('Failed to update order: ' + (result.error || 'Unknown error'), 'error');
                setErrors(result.errors || {});
            }
        } catch (error) {
            enqueueSnackbar('An error occurred. Please try again later.', 'error');
        }
        setLoading(false);
    };

    /**
     * Validates the form to ensure all quantities are within acceptable ranges.
     * 
     * @returns {boolean} True if the form is valid, otherwise false
     */
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

    /**
     * Resets the form data and total price.
     */
    const handleReset = () => {
        const resetData = Object.keys(formData).reduce((acc, key) => {
            acc[key] = { ...formData[key], quantity: 0, checked: false };
            return acc;
        }, {});

        setFormData(resetData);
        setTotalPrice(BASE_PIZZA_PRICE);
    };

    /**
     * Adds a pizza with selected ingredients to the cart.
     */
    const handleAddPizza = () => {
        if (!validateForm()) return;

        const selectedIngredients = ingredients
            .filter(ingredient => formData[ingredient.name].quantity > 0)
            .map(ingredient => ({
                id: ingredient.id,
                quantity: formData[ingredient.name].quantity
            }));

        if (selectedIngredients.length > 0) {
            const newPizza = {
                id: Date.now(),
                name: `Pizza ${cart.length + 1}`,
                ingredients: selectedIngredients
            };
            addToCart(newPizza);
            handleReset(); // Reset form after adding to cart
        }
    };

    /**
     * Handles changes to the ingredient selection, updating the form data and total price.
     * 
     * @param {string} id - The ID of the ingredient
     * @param {number} value - The quantity of the ingredient
     * @param {boolean} checked - Whether the ingredient is selected
     */
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

            const newTotalPrice = Object.values(newFormData).reduce((acc, ingredient) => {
                return acc + (ingredient.checked ? ingredient.price * ingredient.quantity : 0);
            }, 0);

            setTotalPrice(newTotalPrice + BASE_PIZZA_PRICE);

            return newFormData;
        });
    };

    return (
        <Box>
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                    <CircularProgress />
                </Box>
            ) : (
                <Box>
                    <PizzaFormHeader name={orderDetails.customerInfo.firstName} address={orderDetails.customerInfo.address} />
                    <Card sx={{ m: 2 }}>
                        <CardContent>
                            <PizzaFormTotal totalPrice={totalPrice} />
                            <Grid container spacing={2} justifyContent="center" alignItems="center">
                                <form onSubmit={handleSubmit} style={{ width: '100%' }}>
                                    {ingredients.map(ingredient => (
                                        <Grid item xs={12} key={ingredient.name} container spacing={1} alignItems="center">
                                            <Grid item xs={2}>
                                                <img src={ingredient.imagePath} alt={ingredient.name} style={{ width: '50px', height: '50px' }} />
                                            </Grid>
                                            <Grid item xs={8}>
                                                <Typography variant="body1" gutterBottom>{`${ingredient.name} - $${ingredient.price}`}</Typography>
                                                <Slider
                                                    disabled={!formData[ingredient.name]?.checked}
                                                    value={formData[ingredient.name]?.quantity || 0}
                                                    onChange={(e, value) => handleChange(ingredient.name, value, true)}
                                                    valueLabelDisplay="auto"
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
                                                />
                                            </Grid>
                                        </Grid>
                                    ))}
                                    <Grid item xs={12} display="flex" justifyContent="center" marginTop={2}>
                                        <Button onClick={handleAddPizza} variant="contained" sx={{ mr: 1 }}>Add Pizza</Button>
                                        <Button type="submit" variant="contained" sx={{ mr: 1 }}>Finish Order</Button>
                                        <Button onClick={handleReset} variant="contained">Reset Current Pizza</Button>
                                    </Grid>
                                </form>
                            </Grid>
                        </CardContent>
                    </Card>
                </Box>
            )}
        </Box>
    );
}

export default PizzaFormPage;
