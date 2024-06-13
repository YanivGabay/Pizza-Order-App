import React, { useEffect, useState } from 'react';
import { Box, Grid, TextField, Button, Card, CardContent, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useSnackbar } from '../../context/SnackbarContext';

/**
 * Renders the order form page.
 * 
 * @component
 * @returns {JSX.Element} The rendered OrderFormPage component
 */
const OrderFormPage = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const [formFields, setFormFields] = useState([]);
    const [formData, setFormData] = useState({});
    const [cookies] = useCookies(['firstName', 'lastName', 'address', 'phoneNumber']);

    useEffect(() => {
        fetch('/api/v1/form-structure')
            .then(response => response.json())
            .then(data => {
                setFormFields(data);
                let initialData = {};
                data.forEach(field => {
                    const cookieValue = cookies[field.fieldName] ? decodeURIComponent(cookies[field.fieldName]).replace(/\+/g, ' ') : '';
                    initialData[field.fieldName] = cookieValue || initializeFieldValue(field.fieldType);
                });
                setFormData(initialData);
                setLoading(false);
            })
            .catch(error => {
                enqueueSnackbar('Failed to fetch form structure. Please try again later. Error: ' + error, 'error');
            });
    }, [cookies, enqueueSnackbar]);

    /**
     * Validates a form field.
     * 
     * @param {string} name - The name of the field to validate
     * @param {string} value - The value of the field to validate
     * @returns {string} An error message if validation fails, otherwise an empty string
     */
    const validateField = (name, value) => {
        let error = '';
        switch (name) {
            case 'firstName':
                if (!value.trim()) error = 'This field is required';
                else if (value.trim().length < 2) error = 'Must be at least 2 characters long';
                break;
            case 'lastName':
                if (!value.trim()) error = 'This field is required';
                else if (value.trim().length < 2) error = 'Must be at least 2 characters long';
                break;
            case 'phoneNumber':
                if (!/^\d{10}$/.test(value)) error = 'Phone number must be 10 digits';
                break;
            case 'email':
                if (value && !/\S+@\S+\.\S+/.test(value)) error = 'Invalid email address';
                break;
            default:
                break;
        }
        return error;
    };

    /**
     * Initializes the value of a form field based on its type.
     * 
     * @param {string} fieldType - The type of the field
     * @returns {string|number|boolean} The initialized field value
     */
    function initializeFieldValue(fieldType) {
        switch (fieldType) {
            case 'number':
                return 0;
            case 'text':
                return '';
            default:
                return '';
        }
    }

    /**
     * Handles changes to form fields.
     * 
     * @param {Event} event - The change event
     */
    const handleChange = (event) => {
        const { name, value, type } = event.target;
        const updatedValue = type === 'number' ? Number(value) : value;
        const error = validateField(name, updatedValue);

        setFormData(prev => ({
            ...prev,
            [name]: updatedValue
        }));
        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
    };

    /**
     * Handles form submission.
     * 
     * @param {Event} event - The submit event
     */
    const handleSubmit = (event) => {
        event.preventDefault();
        const newErrors = Object.keys(formData).reduce((acc, key) => {
            const error = validateField(key, formData[key]);
            if (error) acc[key] = error;
            return acc;
        }, {});

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        console.log(formData); // Proceed with form submission
        sendFormData();
    };

    /**
     * Sends form data to the backend.
     */
    const sendFormData = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/v1/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const result = await response.json();
            if (response.ok) {
                navigate(`/order/${result.id}/pizza`, { state: { orderDetails: result } });
            } else {
                if (result.errors) {
                    setErrors(result.errors);
                } else {
                    enqueueSnackbar('Failed to submit order. Please try again later.', 'error');
                }
            }
        } catch (error) {
            enqueueSnackbar('An error occurred. Please try again later. Error: ' + error, 'error');
        }
        setLoading(false);
    };

    /**
     * Handles form reset.
     */
    const handleReset = () => {
        setFormData(Object.keys(formData).reduce((acc, key) => {
            acc[key] = initializeFieldValue(formFields.find(field => field.fieldName === key).fieldType);
            return acc;
        }, {}));
        setErrors({});
    }

    return (
        <Box>
            {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                    <CircularProgress />
                </Box>
            ) : (
                <Box>
                    <Card sx={{ m: 2 }}>
                        <CardContent>
                            <Typography variant="h4" align="center">Order Form</Typography>
                            <Typography variant="body1" align="center">Please fill out the form below to place your order.</Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ m: 2 }}>
                        <CardContent>
                            <Grid container spacing={2} justifyContent="center">
                                <Grid item xs={12} sm={10} md={8} lg={6}>
                                    <form onSubmit={handleSubmit}>
                                        {formFields.map(field => (
                                            <TextField
                                                key={field.fieldName}
                                                label={field.fieldName}
                                                type={field.fieldType}
                                                name={field.fieldName}
                                                value={formData[field.fieldName]}
                                                onChange={handleChange}
                                                error={!!errors[field.fieldName]}
                                                helperText={errors[field.fieldName]}
                                                required={field.required}
                                                sx={{ marginBottom: 2 }}
                                                fullWidth
                                            />
                                        ))}
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

export default OrderFormPage;
