import React, { useState } from "react";
import { updateTask } from "../../../services/api";
import styles from "./EditTaskModal.module.css";
import sprite from "../../../assets/icons/icons.svg";

function EditTaskModal({ task, onClose, onTaskUpdated }) {
  const [title, setTitle] = useState(task.title || "");
  const [description, setDescription] = useState(task.description || "");
  const [priority, setPriority] = useState(task.priority || "Medium");
  const [dueDate, setDueDate] = useState(task.dueDate || "");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [error, setError] = useState("");

  // Obține luna curentă pentru calendar
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Prioritățile disponibile
  const priorities = ["Low", "Medium", "High"];

  // Handler pentru submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const taskData = {
        title,
        description,
        priority,
        dueDate,
      };

      const response = await updateTask(token, task._id, taskData);
      if (onTaskUpdated) {
        onTaskUpdated(response.data);
      }
      onClose();
    } catch (err) {
      setError("Failed to update task. Please try again.");
      console.error("Error updating task:", err);
    }
  };

  // Generarea calandarului pentru luna curentă
  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    // Primul zi a lunii
    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Ziua săptămânii pentru prima zi (0 = Duminică)
    const startingDayOfWeek = firstDayOfMonth.getDay();

    const days = [];
    // Zilele din săptămâna anterioară
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className={styles.emptyDay}></div>);
    }

    // Zilele din luna curentă
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = date.toISOString().split("T")[0];
      const isSelected = dateString === dueDate;

      days.push(
        <div
          key={`day-${day}`}
          className={`${styles.calendarDay} ${
            isSelected ? styles.selectedDay : ""
          }`}
          onClick={() => {
            setDueDate(dateString);
            setShowDatePicker(false);
          }}
        >
          {day}
        </div>
      );
    }

    return (
      <div className={styles.calendar}>
        <div className={styles.calendarHeader}>
          <button
            className={styles.calendarNavButton}
            onClick={() => setCurrentMonth(new Date(year, month - 1, 1))}
          >
            &lt;
          </button>
          <span>{`${currentMonth.toLocaleString("default", {
            month: "long",
          })} ${year}`}</span>
          <button
            className={styles.calendarNavButton}
            onClick={() => setCurrentMonth(new Date(year, month + 1, 1))}
          >
            &gt;
          </button>
        </div>
        <div className={styles.calendarDays}>
          <div className={styles.weekday}>Su</div>
          <div className={styles.weekday}>Mo</div>
          <div className={styles.weekday}>Tu</div>
          <div className={styles.weekday}>We</div>
          <div className={styles.weekday}>Th</div>
          <div className={styles.weekday}>Fr</div>
          <div className={styles.weekday}>Sa</div>
          {days}
        </div>
      </div>
    );
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Edit card</h2>
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
              placeholder="Enter card title"
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter card description"
              className={styles.textarea}
              rows="4"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Priority</label>
            <div className={styles.prioritySelector}>
              {priorities.map((p) => (
                <button
                  key={p}
                  type="button"
                  className={`${styles.priorityButton} ${
                    priority === p ? styles.selectedPriority : ""
                  }`}
                  onClick={() => setPriority(p)}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="dueDate">Due Date</label>
            <div className={styles.datePickerContainer}>
              <input
                id="dueDate"
                type="text"
                value={dueDate}
                onClick={() => setShowDatePicker(!showDatePicker)}
                readOnly
                placeholder="Select due date"
                className={styles.input}
              />
              <button
                type="button"
                className={styles.calendarButton}
                onClick={() => setShowDatePicker(!showDatePicker)}
              >
                <svg width="18" height="18">
                  <use href={`${sprite}#icon-calendar`}></use>
                </svg>
              </button>

              {showDatePicker && (
                <div className={styles.calendarDropdown}>
                  {renderCalendar()}
                </div>
              )}
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
            <button type="submit" className={styles.saveButton}>
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTaskModal;
