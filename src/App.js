import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../src/Loginpage/Loginpage';
import Navbar from './Navbar/Navbar';
import Signup from './Signup/Signup';
import Dashboard from './Dashboard/Dashboard';
import Budget from './Budget/Budget';
import React from 'react';
//Backend address: 161.35.188.98

function App() {
  return (
    <div>
      <h1 data-testid='header'>Budget App</h1>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/budget" element={<Budget />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </div>
  );
}
export default App;
