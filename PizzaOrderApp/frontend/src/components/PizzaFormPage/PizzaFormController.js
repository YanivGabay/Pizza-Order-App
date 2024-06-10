import React, { useEffect } from 'react'

import PizzaFormPage from './PizzaFormPage';
import { useLocation, Navigate } from 'react-router-dom';
const PizzaFormGateway = () => {

  

    
const location = useLocation();


     useEffect(() => {
      console.log("in PizzaFormGateway");
      console.log(location.state);
      console.log(location.state?.orderDetails);
    }
    , [location.state]);
//)
  return (
    
    location.state?.orderDetails?<PizzaFormPage orderDetails={location.state.orderDetails} /> : <Navigate to="/notfound" />
  )
}

export default PizzaFormGateway