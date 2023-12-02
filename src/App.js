import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../src/Loginpage/Loginpage';
import Navbar from './Navbar/Navbar';
import Signup from './Signup/Signup';
//Backend address: 161.35.188.98

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<App />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}
export default App;
