import { Button } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Renders a button that navigates to a specified route when clicked.
 * 
 * @component
 * @param {Object} props - The component props
 * @param {string} props.text - The text to display on the button
 * @param {string} props.to - The route to navigate to when the button is clicked
 * @returns {JSX.Element} The rendered HomeButton component
 */
const HomeButton = ({ text, to }) => {
    const navigate = useNavigate();

    /**
     * Handles the button click event and navigates to the specified route.
     */
    const handleClick = () => {
        console.log('Clicked:', text);
        console.log("Navigating to:", to);
        navigate(to);  // Use the 'to' prop to navigate
    };

    return (
        <Button
            variant="contained"
            onClick={handleClick}
            style={{
                width: 150, // Set width and height to make it square
                height: 150,
                margin: 10,
                borderRadius: 8, // Optional, for rounded corners
                fontSize: '1rem' // Adjust font size as needed
            }}
        >
            {text}
        </Button>
    );
};

export default HomeButton;
