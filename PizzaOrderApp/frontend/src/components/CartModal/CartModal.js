import React from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useCart } from '../../context/CartContext';
import { useOrder } from '../../context/OrderContext';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const CartModal = () => {
    const { cart, getIngredientNameById } = useOrder();
    const { isCartModalOpen, toggleCartModal } = useCart();

    return (
        <Modal
            open={isCartModalOpen}
            onClose={toggleCartModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    Your Cart
                </Typography>
                {cart.length > 0 ? (
                    cart.map((pizza, index) => (
                        <Card key={index} sx={{ mt: 2, mb: 2, p: 2 }}>
                            <Typography variant="h6">Pizza {index + 1}</Typography>
                            <List>
                                {pizza.ingredients.map(ingredient => (
                                    <ListItem key={ingredient.id}>
                                        {getIngredientNameById(ingredient.id)} - Quantity: {ingredient.quantity}
                                    </ListItem>
                                ))}
                            </List>
                        </Card>
                    ))
                ) : (
                    <Typography sx={{ mt: 2 }}>Your cart is empty.</Typography>
                )}
            </Box>
        </Modal>
    );
}

export default CartModal;
