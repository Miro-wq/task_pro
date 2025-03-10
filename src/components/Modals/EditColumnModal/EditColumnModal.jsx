import React, { useState } from "react";
import { updateColumn } from "../../../services/api";
import styles from "./EditColumnModal.module.css";
import sprite from "../../../assets/images/icons.svg";

function EditColumnModal({ column, onClose, onColumnUpdated }) {
  const [title, setTitle] = useState(column.title || "");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const columnData = { title };

      const response = await updateColumn(token, column._id, columnData);
      if (onColumnUpdated) {
        onColumnUpdated(response.data);
      }
      onClose();
    } catch (err) {
      setError("Failed to update column. Please try again.");
      console.error("Error updating column:", err);
    }
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Edit column</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <svg width="18" height="18">
              <use href={`${sprite}#icon-close`}></use>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.formGroup}>
            <label htmlFor="title">Title</label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter column title"
              className={styles.input}
            />
          </div>

          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className={styles.saveButton}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditColumnModal;
