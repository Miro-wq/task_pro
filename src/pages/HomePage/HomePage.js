import React from 'react';
import Header from '../../components/header/Header';
import Sidebar from '../../components/SideBar/SideBar';
import ScreensPage from '../../components/ScreensPage/ScreensPage';

const HomePage = () => {
  return (
    <div className="home-page">
      <Header />
      <div className="main-content" style={{ display: 'flex' }}>
        <Sidebar />
        <ScreensPage />
      </div>
    </div>
  );
};

export default HomePage;
