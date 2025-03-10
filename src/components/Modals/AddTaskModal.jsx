import React, { useState } from "react";
import styles from "./Modal.module.css";

function AddTaskModal({ onClose, onAdd, columnId }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Without priority");
  const [dueDate, setDueDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    try {
      const token = localStorage.getItem("token");
      await onAdd(token, columnId, {
        title,
        description,
        priority,
        dueDate,
      });
      onClose();
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Add card</h2>
          <button className={styles.closeButton} onClick={onClose}>
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <input
              type="text"
              className={styles.input}
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <textarea
              className={styles.textarea}
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Label color</label>
            <div className={styles.priorityOptions}>
              <label className={styles.priorityOption}>
                <input
                  type="radio"
                  name="priority"
                  value="Without priority"
                  checked={priority === "Without priority"}
                  onChange={() => setPriority("Without priority")}
                />
                <span
                  className={`${styles.priorityColor} ${styles.noPriority}`}
                ></span>
                Without priority
              </label>
              <label className={styles.priorityOption}>
                <input
                  type="radio"
                  name="priority"
                  value="Low"
                  checked={priority === "Low"}
                  onChange={() => setPriority("Low")}
                />
                <span
                  className={`${styles.priorityColor} ${styles.lowPriority}`}
                ></span>
                Low
              </label>
              <label className={styles.priorityOption}>
                <input
                  type="radio"
                  name="priority"
                  value="Medium"
                  checked={priority === "Medium"}
                  onChange={() => setPriority("Medium")}
                />
                <span
                  className={`${styles.priorityColor} ${styles.mediumPriority}`}
                ></span>
                Medium
              </label>
              <label className={styles.priorityOption}>
                <input
                  type="radio"
                  name="priority"
                  value="High"
                  checked={priority === "High"}
                  onChange={() => setPriority("High")}
                />
                <span
                  className={`${styles.priorityColor} ${styles.highPriority}`}
                ></span>
                High
              </label>
            </div>
          </div>
          <div className={styles.formGroup}>
            <label>Deadline</label>
            <input
              type="date"
              className={styles.dateInput}
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
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

export default AddTaskModal;
