import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
import Button from '@mui/material/Button';
import NotFound from "./components/NotFound";
import Header from "./components/Header";
import Home from "./components/HomePage/Home";



import { ThemeProvider, createTheme } from "@mui/material/styles";
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
    <ThemeProvider theme={theme}>
      <Router>
            <Header>
              <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="*" element={<NotFound />} />  {/* Catch-all for any undefined routes */}
              </Routes>
            </Header>

      </Router>
      </ThemeProvider>
  );
}
