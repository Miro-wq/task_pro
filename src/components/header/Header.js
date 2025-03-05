import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import UserInfo from "../UserInfo/UserInfo";
import { FiChevronDown } from "react-icons/fi";
import styles from "./Header.module.css";

function Header() {
  const { user } = useContext(UserContext);
  const { theme, setTheme } = useContext(ThemeContext);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme); // Acum actualizăm tema corect
    setDropdownOpen(false);
  };

  return (
    <header className={`${styles.header} ${styles[theme]}`}>
      <div className={styles.dropdown}>
        <button
          onClick={() => setDropdownOpen(!isDropdownOpen)}
          className={`${styles.themeButton} ${isDropdownOpen ? styles.dropdownOpen : ""}`}
        >
          Theme <FiChevronDown className={styles.arrow} />
        </button>
        {isDropdownOpen && (
          <ul className={styles.dropdownMenu}>
            <li onClick={() => handleThemeChange("light")}>Light</li>
            <li onClick={() => handleThemeChange("dark")}>Dark</li>
          </ul>
        )}
      </div>

      <div className={styles.userInfo}>
        {user && user.name ? (
          <p className={styles.username}> {user.name}</p>
        ) : (
          <p>Welcome, Guest!</p>
        )}
      </div>

      <UserInfo />
    </header>
  );
}

export default Header;

