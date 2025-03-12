import React, { useState, useContext } from "react";
import { updateTask } from "../../../services/api";
import styles from "./EditTaskModal.module.css";
import sprite from "../../../assets/icons/icons.svg";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeContext } from "../../../context/ThemeContext/ThemeContext";


function EditTaskModal({ task, onClose, onTaskUpdated }) {
  const { theme } = useContext(ThemeContext);
  const [title, setTitle] = useState(task.title || "");
  const [description, setDescription] = useState(task.description || "");
  const [priority, setPriority] = useState(task.priority || "Low");
  const [dueDate, setDueDate] = useState(
    task.dueDate ? new Date(task.dueDate).toISOString().split("T")[0] : ""
  );
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [error, setError] = useState("");

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const labelColorMapping = {
    blue: "#8fa1d0",
    pink: "#e09cb5",
    green: "#bedbb0",
    gray: "#6e6e6e",
  };

  const labelColors = ["blue", "pink", "green", "gray"];
  const [labelColor, setLabelColor] = useState(task.labelColor || "blue");

  const priorityMapping = {
    blue: "Low",
    pink: "Medium",
    green: "High",
    gray: "Without Priority",
  };

  const handleLabelColorChange = (color) => {
    setLabelColor(color);
    setPriority(priorityMapping[color]);
  };

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
        dueDate: dueDate || null,
        labelColor,
      };

      await updateTask(token, task.columnId, task._id, taskData);

      if (onTaskUpdated) {
        onTaskUpdated(task._id);
      }
      onClose();
    } catch (err) {
      setError("Failed to update task. Please try again.");
      console.error("Error updating task:", err);
    }
  };

  const renderCalendar = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const startingDayOfWeek = firstDayOfMonth.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className={styles.emptyDay}></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = date.toISOString().split("T")[0];
      const isSelected = dateString === dueDate;
      const isToday = new Date().toISOString().split("T")[0] === dateString;

      days.push(
        <div
          key={`day-${day}`}
          className={`${styles.calendarDay} ${
            isSelected ? styles.selectedDay : ""
          } ${isToday ? styles.today : ""}`}
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
        <div className={styles.calendarHeader} style = {{background: theme.inputBackground, color: theme.text}}>
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

  const formatDate = (dateString) => {
    if (!dateString) return "Today, Month D";
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    return `Today, ${month} ${day}`;
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent} style = {{background: theme.sidebarBackground, color: theme.text}}>
        <div className={styles.modalHeader} style = {{color: theme.text}}>
          <h2 style = {{color: theme.h2}}>Edit card</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <svg width="18" height="18">
              <use href={`${sprite}#icon-closeBtn`}></use>
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
              placeholder="Title"
              className={styles.input} style = {{background: theme.inputBackground, color: theme.text}}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              className={styles.textarea} style = {{background: theme.inputBackground, color: theme.text}}
              rows="4"
            />
          </div>

          <div className={styles.formGroup}>
            <AnimatePresence mode="wait">
              <motion.div
                key={priority}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className={styles.priorityLabel}
                style={{ backgroundColor: labelColorMapping[labelColor] }}
              >
                {priority}
              </motion.div>
            </AnimatePresence>
            <div className={styles.labelColorSelector}>
              {labelColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`${styles.colorButton} ${styles[color]} ${
                    labelColor === color ? styles.selectedColor : ""
                  }`}
                  onClick={() => handleLabelColorChange(color)}
                  aria-label={`Select ${color} color`}
                  style={{
                    backgroundColor: labelColorMapping[color],
                  }}
                />
              ))}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="dueDate">Deadline</label>
            <div className={styles.datePickerContainer}>
              <input
                id="dueDate"
                type="text"
                value={formatDate(dueDate)}
                onClick={() => setShowDatePicker(!showDatePicker)}
                readOnly
                placeholder="Select due date"
                className={styles.input} style = {{background: theme.inputBackground, color: theme.text}}
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
                <div className={styles.calendarDropdown} style = {{background: theme.inputBackground, color: theme.text}}> 
                  {renderCalendar()}
                </div>
              )}
            </div>
          </div>

          <div className={styles.formActions}>
            <button
              type="button"
              className={styles.cancelButton} style = {{background: theme.inputBackground, color: theme.text}}
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className={styles.saveButton}>
              Edit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditTaskModal;
