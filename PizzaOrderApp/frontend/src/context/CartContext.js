

import React, {createContext,useState, useContext} from 'react';

const CartContext = createContext();


export const CartProvider = ({children}) => {


  const [isCartModalOpen, setCartModalOpen] = useState(false);


  const toggleCartModal = () => {
    console.log("in toggleCartModal");
    setCartModalOpen(!isCartModalOpen);
};


return (
    <CartContext.Provider value={{
        isCartModalOpen,
        toggleCartModal
    }}>
        {children}
    </CartContext.Provider>
);
}

export const useCart = () => useContext(CartContext);