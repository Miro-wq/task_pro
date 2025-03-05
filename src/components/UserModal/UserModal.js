import React, { useState, useEffect } from "react";
import { FiX, FiEye, FiEyeOff } from "react-icons/fi";
import styles from "./UserModal.module.css";

const UserModal = ({
  onClose,
  onAvatarChange,
  currentAvatar,
  currentName,
  currentEmail,
  currentPassword,
  onUserInfoChange,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [avatar, setAvatar] = useState(currentAvatar || ""); // Setează avatarul
  const [name, setName] = useState(currentName || ""); // Setează numele
  const [email, setEmail] = useState(currentEmail || ""); // Setează email-ul
  const [password, setPassword] = useState(currentPassword || ""); // Setează parola

  useEffect(() => {
    // Dacă avem date în localStorage, le încărcăm
    const storedAvatar = localStorage.getItem("avatar");
    const storedName = localStorage.getItem("name");
    const storedEmail = localStorage.getItem("email");
    const storedPassword = localStorage.getItem("password");

    // Log pentru debugging
    console.log("Avatar:", storedAvatar);
    console.log("Name:", storedName);
    console.log("Email:", storedEmail);
    console.log("Password:", storedPassword);

    // Setează datele în state dacă există în localStorage, altfel lasă valorile implicite
    setAvatar(storedAvatar || currentAvatar || "");
    setName(storedName || currentName || "");
    setEmail(storedEmail || currentEmail || "");
    setPassword(storedPassword || currentPassword || "");
  }, [currentAvatar, currentName, currentEmail, currentPassword]);

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

  const handleSave = () => {
    // Salvează datele în localStorage
    localStorage.setItem("name", name);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);

    onUserInfoChange(name, email, password); // Trimite datele actualizate
    onClose(); // Închide modalul
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          <FiX />
        </button>
        <h2 className={styles.title}>Edit profile</h2>
        <div className={styles.avatarContainer}>
          <img
            src={avatar || "/assets/default-avatar.png"} // Folosește avatarul din state
            alt="User Avatar"
            className={styles.avatar}
          />
          <label htmlFor="avatarInput" className={styles.editAvatar}>+</label>
          <input
            id="avatarInput"
            type="file"
            accept="image/*"
            onChange={handleAvatarChange}
            style={{ display: 'none' }}
          />
        </div>
        <input
          type="text"
          placeholder="Name"
          className={styles.input}
          value={name} // Pre-populează cu numele utilizatorului
          onChange={(e) => setName(e.target.value)} // Permite modificarea numelui
        />
        <input
          type="email"
          placeholder="Email"
          className={styles.input}
          value={email} // Pre-populează cu email-ul utilizatorului
          onChange={(e) => setEmail(e.target.value)} // Permite modificarea email-ului
        />
        <div className={styles.passwordContainer}>
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            className={styles.input}
            value={password} // Pre-populează cu parola utilizatorului
            onChange={(e) => setPassword(e.target.value)} // Permite modificarea parolei
          />
          <button
            className={styles.eyeButton}
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
        <button className={styles.sendButton} onClick={handleSave}>
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default UserModal;

