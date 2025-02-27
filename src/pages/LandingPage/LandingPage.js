import React from 'react';
import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css';
import taskProLogo from '../../assets/images/task_pro_logo.png';

function LandingPage() {
    return (
        <div className={styles.container}>
            <img src={taskProLogo} alt="Task Pro Logo" className={styles.logo} />
            <h1 className={styles.title}>
                <svg className={styles.icon}>
                    <use xlinkHref="/assets/icons/symbol-defs.svg#icon-black_icon" />
                </svg>
                Task Pro</h1>
            <p className={styles.subtitle}>
                Supercharge your productivity and take control of your tasks with Task Pro - Don't wait, start achieving your goals now!
            </p>

            <div className={styles.buttonsContainer}>
                <Link to="/register" className={styles.registerButton}>
                    Registration
                </Link>
                <Link to="/login" className={styles.loginButton}>
                    Log In
                </Link>
            </div>
        </div>
    );
}

export default LandingPage;
