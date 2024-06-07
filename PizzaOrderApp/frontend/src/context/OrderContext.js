import React, {createContext, useState, useContext, useEffect} from 'react';

const OrderContext = createContext();


export const OrderProvider = ({ children }) => {
    const [currentOrder, setCurrentOrder] = useState(null);
    const [cart, setCart] = useState([]);
    const [userDetails, setUserDetails] = useState({});


    const addToCart = (pizza) => {
        setCart([...cart, pizza]);
    };

    const removeFromCart = (pizzaId) => {
        setCart(cart.filter(pizza => pizza.id !== pizzaId));
    };

    const updatePizzaInCart = (pizzaId, newDetails) => {
        setCart(cart.map(pizza => pizza.id === pizzaId ? { ...pizza, ...newDetails } : pizza));
    };

    const updateUserDetails = (details) => {
        setUserDetails({...userDetails, ...details});
    };

    const clearOrder = () => {
        //will get from server
        //the full details for the cookies
        //or something
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

export const useOrder = () => useContext(OrderContext);
