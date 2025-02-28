// pagina de testare a userului
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import Header from '../../components/header/Header';
import Sidebar from '../../components/Sidebar/SideBar';
import styles from './HomePage.module.css';

function HomePage() {
  const navigate = useNavigate();
  const { user, loading, error, logout } = useContext(UserContext);


  useEffect(() => {
    if (!loading && !user) {
      navigate('/');
    }
  }, [loading, user, navigate]);

  if (loading) {
    return <div>Loading user data...</div>;
  }

  if (error) {
    return (
      <div>
        <p>{error}</p>
        <button onClick={() => navigate('/login')}>Go to Login</button>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className={styles.homePage}>
        <Sidebar />
        <div className={styles.container}>
          <h1 className={styles.title}>Welcome, {user?.name}</h1>

          <button className={styles.logoutButton}
            onClick={() => {
              logout();
              // navigate('/');
            }}
          >
            <svg className={styles.icon}>
              <use xlinkHref="/assets/icons/symbol-defs.svg#icon-logout" />
            </svg>
            Log out
          </button>
        </div>
      </div>
    </>
  );
}

export default HomePage;

