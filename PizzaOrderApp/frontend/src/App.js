import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
import Button from '@mui/material/Button';
import NotFound from "./components/NotFound";
import Header from "./components/Header";
import Home from "./components/Home";
export default function App() {
  return (
      <Router>
            <Header>
              <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="*" element={<NotFound />} />  {/* Catch-all for any undefined routes */}
              </Routes>
            </Header>

      </Router>
  );
}
