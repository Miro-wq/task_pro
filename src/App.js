import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext/ThemeContext";
import LandingPage from "./pages/LandingPage/LandingPage";
import Login from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import HomePage from "./pages/HomePage/HomePage";
import ScreensPage from "./components/ScreensPage/ScreensPage";
import Header from "./components/header/Header";

function App() {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`app-container ${theme}`}>
      <Router>
        <Header /> {/* Header rămâne constant în aplicație */}
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/home/:boardId" element={<ScreensPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
