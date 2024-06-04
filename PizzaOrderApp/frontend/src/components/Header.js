import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';

/**
 * The Header component renders the header of the application.
 *

 * It contains a title and a button to navigate back to the home page.

 * @returns {JSX.Element} The rendered game component.
 *

 */

function Header({children}) {
    const navigate = useNavigate();
    const goHome = () => {
        navigate('/');  // Navigate back to the home page
    };
    return (
        <Box>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Mario's Pizza

                </Typography>
                <Button onClick={goHome} color="inherit">Home</Button>

            </Toolbar>
        </AppBar>

        {children}
    </Box>

    );
}

export default Header;
