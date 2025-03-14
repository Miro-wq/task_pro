import React, { useState, useEffect } from "react";
import UserModal from "../UserModal/UserModal";
import styles from "./UserInfo.module.css";

function UserInfo() {
  const [isModalOpen, setModalOpen] = useState(false);

  const [avatar, setAvatar] = useState(
    localStorage.getItem("avatar") || "/assets/icons/icons.svg"
  );
  const [name, setName] = useState(localStorage.getItem("name") || "User");
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [password, setPassword] = useState(
    localStorage.getItem("password") || ""
  );

  useEffect(() => {
    if (!isModalOpen) {
      setAvatar(localStorage.getItem("avatar") || "assets/images/abstract.png");
      setName(localStorage.getItem("name") || "User");
      setEmail(localStorage.getItem("email") || "");
      setPassword(localStorage.getItem("password") || "");
    }
  }, [isModalOpen]);

  return (
    <div className={styles.userInfo}>
      <img
        src={avatar}
        alt=" "
        className={styles.avatar}
        onClick={() => setModalOpen(true)}
      />
      {isModalOpen && (
        <UserModal
          onClose={() => setModalOpen(false)}
          currentAvatar={avatar}
          currentName={name}
          currentEmail={email}
          currentPassword={password}
          onUserInfoChange={(updatedName, updatedEmail, updatedPassword) => {
            setName(updatedName);
            setEmail(updatedEmail);
            setPassword(updatedPassword);
            localStorage.setItem("name", updatedName);
            localStorage.setItem("email", updatedEmail);
            localStorage.setItem("password", updatedPassword);
          }}
          onAvatarChange={(newAvatar) => {
            setAvatar(newAvatar);
            localStorage.setItem("avatar", newAvatar);
          }}
        />
      )}
    </div>
  );
}

export default UserInfo;
