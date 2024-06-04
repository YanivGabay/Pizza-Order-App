import React from 'react';

import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';

import { AppBar, Toolbar, Typography, Button, IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


function onCartClick() {
    console.log('Cart clicked');
}
function cartCount() {
    return 5;
}


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
              
                <IconButton color="primaryLight" onClick={onCartClick}>
                    <Badge badgeContent={5} color="secondary">
                        <ShoppingCartIcon />
                    </Badge>
                </IconButton>
               
                <Button onClick={goHome} color="inherit">Home</Button>

            </Toolbar>
        </AppBar>

        {children}
    </Box>

    );
}

export default Header;
