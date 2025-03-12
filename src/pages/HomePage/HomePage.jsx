import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { ThemeProvider } from "styled-components";
import Header from "../../components/header/Header";
import Sidebar from "../../components/SideBar/SideBar";
import styles from "./HomePage.module.css";
import ScreensPage from "../../components/ScreensPage/ScreensPage";
import Loader from "../../components/Loader/Loader";

function HomePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { user, loading, error, logout } = useContext(UserContext);
  const { theme } = useContext(ThemeContext);
  const [selectedBoardId, setSelectedBoardId] = useState(null);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    if (!loading && !user) {
      navigate("/");
    }
  }, [loading, user, navigate]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={() => navigate("/login")}>Go to Login</button>
      </div>
    );
  }

  const handleSelectBoard = (boardId) => {
    setSelectedBoardId(boardId);
  };

  return (
    <ThemeProvider theme={theme}>
      <div
        className={styles.homePage}
        style={{ background: theme.background, color: theme.text }}
      >
        <Header onToggleSidebar={handleToggleSidebar} />
        <Sidebar
          isOpen={isSidebarOpen}
          onSelectBoard={handleSelectBoard}
          onClose={() => setIsSidebarOpen(false)}
        />
        <div className={styles.container}>
          <button className={styles.logoutButton} onClick={logout}>
            <svg className={styles.icon}>
              <use xlinkHref="/assets/icons/symbol-defs.svg#icon-logout" />
            </svg>
            Log out
          </button>
          <ScreensPage boardId={selectedBoardId} />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default HomePage;
