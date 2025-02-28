// import React from 'react';
// import Header from '../../components/header/Header';
// import Sidebar from '../../components/SideBar/SideBar';
// import ScreensPage from '../../components/ScreensPage/ScreensPage';

// const HomePage = () => {
//   return (
//     <div className="home-page">
//       <Header />
//       <div className="main-content" style={{ display: 'flex' }}>
//         <Sidebar />
//         <ScreensPage />
//       </div>
//     </div>
//   );
// };

// export default HomePage;


// pagina de testare
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserProfile } from '../../services/api';
import styles from './HomePage.module.css';

function HomePage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    getUserProfile(token)
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Could not fetch user data. Please log in again.');
        setLoading(false);
      });
  }, [navigate]);

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
      <div className={styles.header}>
        <h1 className={styles.logo}>
          <svg className={styles.icon}>
            <use xlinkHref="/assets/icons/symbol-defs.svg#icon-black_icon" />
          </svg>
          Task Pro</h1>
      </div>
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome, {user.name}!</h1>
        <p className={styles.subTitle}>Your email is: {user.email}</p>
        <p className={styles.user}>User ID: {user._id}</p>

        <button className={styles.logoutButton}
          onClick={() => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            navigate('/');
          }}
        >
          <svg className={styles.icon}>
            <use xlinkHref="/assets/icons/symbol-defs.svg#icon-logout" />
          </svg>
          Logout
        </button>
      </div>
    </>
  );
}

export default HomePage;

