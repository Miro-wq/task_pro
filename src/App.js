import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import LandingPage from './pages/LandingPage/LandingPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;