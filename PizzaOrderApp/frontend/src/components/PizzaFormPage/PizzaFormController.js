import React, { useEffect } from 'react';
import PizzaFormPage from './PizzaFormPage';
import { useLocation, Navigate } from 'react-router-dom';
import { useSnackbar } from '../../context/SnackbarContext';
/**
 * Renders the PizzaFormPage component if order details are present in the location state,
 * otherwise navigates to the not found page.
 * 
 * @component
 * @returns {JSX.Element} The rendered PizzaFormGateway component
 */
const PizzaFormGateway = () => {
    const { enqueueSnackbar } = useSnackbar();
    const location = useLocation();

    useEffect(() => {
        if (!location.state?.orderDetails) {
           enqueueSnackbar('Order details not found', 'error');
        }
    }, [location.state]);

    return (
        location.state?.orderDetails ? (
            <PizzaFormPage orderDetails={location.state.orderDetails} />
        ) : (
            <Navigate to="/notfound" />
        )
    );
}

export default PizzaFormGateway;
