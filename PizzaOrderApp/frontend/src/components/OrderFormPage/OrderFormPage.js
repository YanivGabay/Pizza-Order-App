import { Box } from '@mui/material';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
const OrderFormPage = () => {

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [formFields, setFormFields] = useState([]); 
    const [formData, setFormData] = useState({});


    useEffect(() => {
        fetch('/api/form-structure')
            .then(response => response.json())
            .then(data => {
                setFormFields(data);
                // Initialize formData state with fields from the backend, defaulting values to empty.
                let initialData = {};
                data.forEach(field => {
                    initialData[field.fieldName] = '';
                });
                setFormData(initialData);
            })
            .catch(error => console.error('Failed to fetch form structure:', error));
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Form submission logic
    };

  return (
    <Box>
     <form onSubmit={handleSubmit}>
            {formFields.map(field => (
                <TextField
                    key={field.fieldName}
                    label={field.fieldName}
                    type={field.fieldType}
                    name={field.fieldName}
                    value={formData[field.fieldName]}
                    onChange={handleChange}
                    required={field.required}
                    fullWidth
                />
            ))}
          
        </form>
        <Button type="submit" variant="contained">Submit</Button>
    </Box>
  )
}

export default OrderFormPage