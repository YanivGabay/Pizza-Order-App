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
import OrderView from "./components/OrderView/OrderView";
import { OrderProvider } from "./context/OrderContext";
import OrderDetails from "./components/OrderView/OrderDetails";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import PizzaFormController from "./components/PizzaFormPage/PizzaFormController";
import { CookiesProvider } from "react-cookie";
import { SnackbarProvider } from "./context/SnackbarContext";
import { CartProvider } from "./context/CartContext";
import CartModal from "./components/CartModal/CartModal";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2a9461",
    },
    secondary: {
      main: "#494c7d",
    },
    primaryLight: {
      main: "#dbece2",
      contrastText: "#616161",
    },
  },
});

/**
 * Main application component that sets up routing and context providers.
 * 
 * @component
 * @returns {JSX.Element} The rendered component.
 * 
 * @example
 * return (
 *   <App />
 * )
 */
export default function App() {
  return (
    <SnackbarProvider>
      <CookiesProvider>
        <ThemeProvider theme={theme}>
          <OrderProvider>
            <CartProvider>
              <Router>
                <Header />
                <CartModal />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/order/new" element={<OrderFormPage />} />
                  <Route path="/order/view" element={<OrderView />} />
                  <Route path="/order/:orderId/pizza" element={<PizzaFormController />} />
                  <Route path="/success/:orderId" element={<OrderDetails />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Router>
            </CartProvider>
          </OrderProvider>
        </ThemeProvider>
      </CookiesProvider>
    </SnackbarProvider>
  );
}
