import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage/LandingPage";
import Login from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import HomePage from "./pages/HomePage/HomePage";
import ScreensPage from "./components/ScreensPage/ScreensPage";
import AuthSuccess from "./components/Google/AuthSuccess";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/auth-success" element={<AuthSuccess />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/home/:boardId" element={<ScreensPage />} />
      </Routes>
    </Router>
  );
}

export default App;
