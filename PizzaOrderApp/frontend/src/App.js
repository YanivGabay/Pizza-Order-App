import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,

} from "react-router-dom";
import Button from '@mui/material/Button';
import NotFound from "./components/NotFound";
export default function App() {
  return (
      <Router>
          <Home>
              <Routes>


                  <Route path="*" element={<NotFound />} />  {/* Catch-all for any undefined routes */}
              </Routes>
          </Home>
      </Router>
  );
}

function Home() {
  return <h2>Home</h2>;
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}