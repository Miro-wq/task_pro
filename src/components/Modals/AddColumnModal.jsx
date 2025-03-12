import React, { useState, useContext } from "react";
import styles from "./Modal.module.css";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";

function AddColumnModal({ onClose, onAdd, boardId }) {
  const { theme } = useContext(ThemeContext);
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const token = localStorage.getItem("token");
      await onAdd(token, boardId, { title });
      onClose();
    } catch (error) {
      console.error("Failed to add column:", error);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}  style = {{background: theme.sidebarBackground, color: theme.text}}>
        <div className={styles.modalHeader}>
          <h2>Add column</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <input
              type="text"
              className={styles.input} style = {{background: theme.inputBackground, color: theme.text}}
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <button type="submit" className={styles.addButton}>
            <span className={styles.plusSign}>+</span>
            Add
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddColumnModal;
