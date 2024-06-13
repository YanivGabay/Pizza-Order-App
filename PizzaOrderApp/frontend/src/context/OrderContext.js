import React, { createContext, useState, useContext, useEffect } from 'react';

const OrderContext = createContext();

/**
 * Provides order-related state and functionality to its children.
 * 
 * @component
 * @param {Object} props - The component props
 * @param {ReactNode} props.children - The child components
 * @returns {JSX.Element} The rendered component
 */
export const OrderProvider = ({ children }) => {
    const [currentOrder, setCurrentOrder] = useState(null);
    const [cart, setCart] = useState([]);
    const [userDetails, setUserDetails] = useState({});
    const [ingredients, setIngredients] = useState([]);

    useEffect(() => {
        fetch('/api/v1/ingredients')
            .then(response => response.json())
            .then(data => {
                setIngredients(data);  // Save fetched ingredients in context
            })
            .catch(error => console.error('Failed to fetch ingredients:', error));
    }, []);

    /**
     * Adds a pizza to the cart.
     * 
     * @param {Object} pizza - The pizza to add to the cart
     */
    const addToCart = (pizza) => {
        setCart([...cart, pizza]);
        console.log(cart);
    };

    /**
     * Removes a pizza from the cart by ID.
     * 
     * @param {number} pizzaId - The ID of the pizza to remove
     */
    const removeFromCart = (pizzaId) => {
        setCart(cart.filter(pizza => pizza.id !== pizzaId));
    };

    /**
     * Updates a pizza in the cart with new details.
     * 
     * @param {number} pizzaId - The ID of the pizza to update
     * @param {Object} newDetails - The new details for the pizza
     */
    const updatePizzaInCart = (pizzaId, newDetails) => {
        setCart(cart.map(pizza => pizza.id === pizzaId ? { ...pizza, ...newDetails } : pizza));
    };

    /**
     * Updates the user details.
     * 
     * @param {Object} details - The new details for the user
     */
    const updateUserDetails = (details) => {
        setUserDetails({ ...userDetails, ...details });
    };

    /**
     * Gets the name of an ingredient by its ID.
     * 
     * @param {number} id - The ID of the ingredient
     * @returns {string} The name of the ingredient or 'Unknown' if not found
     */
    const getIngredientNameById = (id) => {
        const ingredient = ingredients.find(ing => ing.id === id);
        return ingredient ? ingredient.name : 'Unknown';
    };

    /**
     * Clears the current order and resets the state.
     */
    const clearOrder = () => {
        setCurrentOrder(null);
        setCart([]);
        setUserDetails({
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: ''
        });
    };

    return (
        <OrderContext.Provider value={{
            getIngredientNameById,
            ingredients,
            setIngredients,
            currentOrder,
            setCurrentOrder,
            cart,
            addToCart,
            removeFromCart,
            updatePizzaInCart,
            userDetails,
            updateUserDetails,
            clearOrder
        }}>
            {children}
        </OrderContext.Provider>
    );
};

/**
 * Custom hook to use the order context.
 * 
 * @returns {Object} The order context value
 */
export const useOrder = () => useContext(OrderContext);
