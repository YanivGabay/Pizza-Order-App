import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

/**
 * Provides cart-related state and functionality to its children.
 * 
 * @component
 * @param {Object} props - The component props
 * @param {ReactNode} props.children - The child components
 * @returns {JSX.Element} The rendered component
 */
export const CartProvider = ({ children }) => {
    const [isCartModalOpen, setCartModalOpen] = useState(false);

    /**
     * Toggles the cart modal open and closed.
     */
    const toggleCartModal = () => {
   
        setCartModalOpen(!isCartModalOpen);
    };

    return (
        <CartContext.Provider value={{ isCartModalOpen, toggleCartModal }}>
            {children}
        </CartContext.Provider>
    );
};

/**
 * Custom hook to use the cart context.
 * 
 * @returns {Object} The cart context value
 */
export const useCart = () => useContext(CartContext);
