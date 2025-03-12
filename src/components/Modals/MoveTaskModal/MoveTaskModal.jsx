import React, { useState } from "react";
import { moveTask } from "../../../services/api";
import styles from "./MoveTaskModal.module.css";
import sprite from "../../../assets/icons/icons.svg";

function MoveTaskModal({ task, columns, onClose, onTaskMoved }) {
  const [selectedColumnId, setSelectedColumnId] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedColumnId) {
      setError("Please select a column");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await moveTask(token, task._id, selectedColumnId);

      if (onTaskMoved) {
        onTaskMoved(task._id);
      }
      onClose();
    } catch (err) {
      setError("Failed to move task. Please try again.");
      console.error("Error moving task:", err);
    }
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Move Card</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <svg width="18" height="18">
              <use href={`${sprite}#icon-close`}></use>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          {error && <div className={styles.error}>{error}</div>}

          <div className={styles.formGroup}>
            <label>Select Column</label>
            <div className={styles.columnsList}>
              {columns.map((column) => (
                <button
                  key={column._id}
                  type="button"
                  className={`${styles.columnButton} ${
                    selectedColumnId === column._id ? styles.selectedColumn : ""
                  }`}
                  onClick={() => setSelectedColumnId(column._id)}
                  disabled={column._id === task.columnId}
                >
                  {column.title}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className={styles.moveButton}>
              Move
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MoveTaskModal;
