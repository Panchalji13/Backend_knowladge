import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; // Keep this if you have additional custom styles
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./Components/Login.js";
import Home from  "./Components/HomePage.js";

function App() {
  return (
    // <div>
    //   <Login/>
    //   <Home/>
    // </div>

    <Router>
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        {/* Add other routes as needed */}
    </Routes>
</Router>
  );
}

export default App;
