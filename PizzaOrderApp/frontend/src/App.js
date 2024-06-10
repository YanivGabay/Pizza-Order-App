import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
import NotFound from "./components/NotFound";
import Header from "./components/Header";
import Home from "./components/HomePage/Home";
import OrderFormPage from "./components/OrderFormPage/OrderFormPage";
import PizzaFormPage from "./components/PizzaFormPage/PizzaFormPage";
import OrderView from "./components/OrderView/OrderView";
import { OrderProvider } from "./context/OrderContext";
import OrderDetails from "./components/OrderView/OrderDetails";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import PizzaFormController from "./components/PizzaFormPage/PizzaFormController";


const theme = createTheme({
  palette: {
    primary: {
      main: "#2a9461"
    },
    secondary: {
      main: "#494c7d"
    },
    primaryLight: {
      main: "#dbece2",
      contrastText: "#616161"
    }
  }
});


export default function App() {
  return (
    //some context providers should exists
    //in the future. to acess the cart more easily
    //the cart should have it own context?
    //<CartProvider>

    <ThemeProvider theme={theme}>
      <OrderProvider>
        <Router>
          <Header />
          <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/order/new" element={<OrderFormPage />} />
    <Route path="/order/:orderId" element={<OrderView />} />
    <Route path="/order/:orderId/pizza" element={<PizzaFormController />}/>
    <Route path="/success/:orderId" element = {<OrderDetails />} />
    <Route path="*" element={<NotFound />} />
</Routes>

        </Router>
      </OrderProvider>
    </ThemeProvider>
  );
}
