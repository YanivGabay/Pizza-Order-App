import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import { AppBar, Toolbar, Typography, Button, IconButton, Badge } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useOrder } from '../context/OrderContext';
import { useCart } from '../context/CartContext';

/**
 * Header component to display the application header with navigation and cart information.
 * 
 * @component
 * @param {Object} props - The component props
 * @param {ReactNode} props.children - The child components
 * @returns {JSX.Element} The rendered component
 */
function Header({ children }) {
    const navigate = useNavigate();
    const { cart } = useOrder();
    const { toggleCartModal } = useCart();
    const cartCount = cart.length;

    /**
     * Navigates to the home page.
     */
    const goHome = () => {
        navigate('/');
    };

    return (
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Mario's Pizza
                    </Typography>
                    <IconButton color="inherit" onClick={toggleCartModal}>
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
