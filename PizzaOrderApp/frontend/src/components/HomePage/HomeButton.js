import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';



const HomeButton = (text , to) => {

    const navigate = useNavigate();

    const handleClick = () => {
      navigate(to);
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
      {text.text}
    </Button>
  )
}

export default HomeButton