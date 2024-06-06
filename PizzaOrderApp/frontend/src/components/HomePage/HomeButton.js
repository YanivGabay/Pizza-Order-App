import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';





const HomeButton = ({text , to}) => {

    const navigate = useNavigate();

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
  )
}

export default HomeButton