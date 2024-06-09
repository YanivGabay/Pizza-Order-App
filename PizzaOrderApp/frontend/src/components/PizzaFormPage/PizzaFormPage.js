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
    const [ingredients, setIngredients] = useState([]);
    const [formData, setFormData] = useState({});

    const { addToCart } = useOrder();
    useEffect(() => {
        fetch('/api/v1/ingredients')
            .then(response => response.json())
            .then(data => {
                setIngredients(data);
                setFormData(data.reduce((acc, ingredient) => {
                    acc[ingredient.name] = { quantity: 0, price: ingredient.price }; // Assume price is also fetched or predefined
                    return acc;
                }, {}));
                setLoading(false);
            })
            .catch(error => console.error('Failed to fetch ingredients:', error));
    }, []);


    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
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

        if (!validateForm()) {
           // alert("Please correct the errors in the form.");
            return;
        }
        const pizza = {
            ingredients: formData,
            //to add more details
            //notes: '',
            //size: '',
            //crust: '',
        };
        addToCart(pizza);
        handleReset();

    };

    const handleChange = (event, ingredient) => {
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
                    <CircularProgress />  // Loading indicator
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
                                <Grid item xs={12} sm={10} md={8} lg={6}>
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
                                                    onChange={(e) => handleChange(e, ingredient)}
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
                                            <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2, m: 2 }}>Submit</Button>
                                            <Button type="reset" onClick={handleReset} variant="contained" sx={{ mt: 3, mb: 2, m: 2 }}>Reset</Button>
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