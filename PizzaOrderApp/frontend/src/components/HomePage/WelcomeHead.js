import React from 'react';
import { Box, Typography } from '@mui/material';

/**
 * Renders the welcome header.
 * 
 * @component
 * @returns {JSX.Element} The rendered WelcomeHead component
 */
const WelcomeHead = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Box m={2}>
        <Typography align='center' variant="h2">
          Welcome to Mario's Pizza
        </Typography>
      </Box>
    </Box>
  );
};

export default WelcomeHead;
