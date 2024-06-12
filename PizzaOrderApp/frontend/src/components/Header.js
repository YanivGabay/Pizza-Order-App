import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { AppBar, Toolbar, Typography, Button, IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useOrder } from '../context/OrderContext';
import { useCart } from '../context/CartContext';

function Header({children}) {
    const navigate = useNavigate();
    const { cart } = useOrder();
    const { toggleCartModal } = useCart();  // Corrected function name
    const cartCount = cart.length;

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
                    <IconButton color="primaryLight" onClick={toggleCartModal}>
                        <Badge badgeContent={cartCount} color="secondary">
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
