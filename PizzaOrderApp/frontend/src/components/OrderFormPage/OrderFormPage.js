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

// A simple representation to mimic backend structure
    const exampleFormField = {
        fieldName: 'exampleName',
        fieldType: 'text',
        required: true
    };

    useEffect(() => {
        fetch('/api/v1/form-structure')
            .then(response => response.json())
            .then(data => {
                setFormFields(data);
                let initialData = {};
                data.forEach(field => {
                    initialData[field.fieldName] = field.fieldType === 'number' ? 0 : '';
                });
                setFormData(initialData);
            })
            .catch(error => console.error('Failed to fetch form structure:', error));
    }, []);


    const handleChange = (event) => {
        const { name, value, type } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'number' ? Number(value) : value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData); // Process submission here
        // Send formData to backend
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
         <Button type="submit" variant="contained">Submit</Button>
        </form>

    </Box>
  )
}

export default OrderFormPage