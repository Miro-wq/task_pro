import React, { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import UserInfo from "../UserInfo/UserInfo";
import { FiChevronDown } from "react-icons/fi";
import styles from "./Header.module.css";

function Header({ onToggleSidebar }) {
  const { user } = useContext(UserContext);
  const { theme, switchTheme } = useContext(ThemeContext);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleThemeChange = (themeName) => {
    switchTheme(themeName);
    setDropdownOpen(false);
  };

  return (
    <>
      <button className={styles.hamburger} onClick={onToggleSidebar}>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </button>
      <header
        className={styles.header}
        style={{ background: theme.headerBackground, color: theme.text }}
      >
        <div className={styles.dropdown}>
          <button
            onClick={() => setDropdownOpen(!isDropdownOpen)}
            className={`${styles.themeButton} ${
              isDropdownOpen ? styles.dropdownOpen : ""
            }`}
          >
            Theme <FiChevronDown className={styles.arrow} />
          </button>
          {isDropdownOpen && (
            <ul
              className={styles.dropdownMenu}
              style={{ background: theme.headerDropdownMenu }}
            >
              <li onClick={() => handleThemeChange("light")}>Light</li>
              <li onClick={() => handleThemeChange("violet")}>Violet</li>
              <li onClick={() => handleThemeChange("dark")}>Dark</li>
            </ul>
          )}
        </div>

        <div className={styles.userInfo}>
          {user && user.name ? (
            <p
              className={styles.username}
              style={{ color: theme.headerUsername }}
            >
              {" "}
              {user.name}
            </p>
          ) : (
            <p>Welcome, Guest!</p>
          )}
        </div>

        <UserInfo />
      </header>
    </>
  );
}

export default Header;
