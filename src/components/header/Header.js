import React, { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import styles from './Header.module.css';

function Header() {
    const { user } = useContext(UserContext);

    return (
        <header>
            <div className={styles.header}>
                {user ? (
                    <h1 className={styles.userName}>{user.name}</h1>
                ) : (
                    <h1>Please log in</h1>
                )}
            </div>
        </header>
    );
}

export default Header;
