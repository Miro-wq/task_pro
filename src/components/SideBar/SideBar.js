import React from 'react';
import styles from './SideBar.module.css';

function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <h1 className={styles.logo}>
                <svg className={styles.icon}>
                    <use xlinkHref="/assets/icons/symbol-defs.svg#icon-black_icon" />
                </svg>
                Task Pro</h1>
        </div>
    );
}

export default Sidebar;