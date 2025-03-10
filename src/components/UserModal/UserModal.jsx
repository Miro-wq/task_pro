import React, { useState, useContext } from "react";
import { FiX, FiEye, FiEyeOff } from "react-icons/fi";
import styles from "./UserModal.module.css";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";
import { UserContext } from "../../context/UserContext";

function UserModal({ onClose, onAvatarChange }) {
  const { theme } = useContext(ThemeContext);
  const { user, updateName, setUser } = useContext(UserContext); // updateName din UserContext.js
  const [newName, setNewName] = useState(user?.name || ""); // seteaza numele userului

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [avatar, setAvatar] = useState(user.avatar);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result); // Setează avatarul
        localStorage.setItem("avatar", reader.result); // Salvează avatarul în localStorage
        onAvatarChange(reader.result); // Trimite noul avatar
      };
      reader.readAsDataURL(file); // Citește fișierul
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ name, email, avatar });
    onClose();
  };

  // handleSave ca sa salveze numele userului in DB
  const handleSave = () => {
    updateName(newName);
  };

  return (
    <div className={styles.overlay}>
      <div
        className={styles.modal}
        style={{ background: theme.modal, color: theme.text }}
      >
        <button
          className={styles.closeButton}
          onClick={onClose}
          style={{ color: theme.closeButton }}
        >
          <FiX />
        </button>
        <h2 className={styles.title}>Edit profile</h2>
        <div className={styles.avatarContainer}>
          <img
            src={avatar || "/assets/icons/icons.svg"}
            alt="User Avatar"
            className={styles.avatar}
          />
          <label htmlFor="avatarInput" className={styles.editAvatar}>
            +
          </label>
          <input
            id="avatarInput"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            style={{ display: "none" }}
          />
        </div>
        <form onSubmit={handleSubmit}>
          {/* onChange pentru newName de mai sus */}
          <input
            type="text"
            placeholder="New Name"
            className={styles.input}
            style={{ color: theme.text }}
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className={styles.input}
            style={{ color: theme.text }}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div className={styles.passwordContainer}>
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Password"
              className={styles.input}
              style={{ color: theme.text }}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              type="button"
              className={styles.eyeButton}
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              {passwordVisible ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          {/* onClick poe buton ca sa poate sa trimita datele in DB (vezi handleSave de mai sus) */}
          <button
            type="submit"
            onClick={handleSave}
            className={styles.sendButton}
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}

export default UserModal;
