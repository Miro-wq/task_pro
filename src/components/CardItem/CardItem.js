import React, { useState } from "react";
import styles from "./CardItem.module.css";
import EditTaskModal from "../Modals/EditTaskModal/EditTaskModal";
import { deleteTask } from "../../services/api";
import sprite from "../../assets/images/icons.svg";

function CardItem({ task, onTaskUpdated, onTaskDeleted }) {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  // Formatare dată
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  // Determinare culoare prioritate
  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "low":
        return styles.lowPriority;
      case "medium":
        return styles.mediumPriority;
      case "high":
        return styles.highPriority;
      default:
        return styles.mediumPriority;
    }
  };

  // Handler pentru ștergere task
  const handleDeleteTask = async () => {
    try {
      const token = localStorage.getItem("token");
      await deleteTask(token, task._id);
      if (onTaskDeleted) {
        onTaskDeleted(task._id);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Handler pentru actualizare task
  const handleTaskUpdated = (updatedTask) => {
    if (onTaskUpdated) {
      onTaskUpdated(updatedTask);
    }
  };

  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div
            className={`${styles.priorityIndicator} ${getPriorityColor(
              task.priority
            )}`}
          ></div>
          <button
            className={styles.optionsButton}
            onClick={() => setShowOptions(!showOptions)}
          >
            <svg width="16" height="16">
              <use href={`${sprite}#icon-more`}></use>
            </svg>
          </button>

          {showOptions && (
            <div className={styles.optionsMenu}>
              <button
                className={styles.optionItem}
                onClick={() => {
                  setShowOptions(false);
                  setShowEditModal(true);
                }}
              >
                <svg width="16" height="16">
                  <use href={`${sprite}#icon-pencil`}></use>
                </svg>
                Edit
              </button>
              <button
                className={styles.optionItem}
                onClick={() => {
                  setShowOptions(false);
                  handleDeleteTask();
                }}
              >
                <svg width="16" height="16">
                  <use href={`${sprite}#icon-trash`}></use>
                </svg>
                Delete
              </button>
            </div>
          )}
        </div>

        <h3 className={styles.cardTitle}>{task.title}</h3>

        {task.description && (
          <p className={styles.cardDescription}>{task.description}</p>
        )}

        <div className={styles.cardFooter}>
          {task.priority && (
            <span
              className={`${styles.priority} ${getPriorityColor(
                task.priority
              )}`}
            >
              {task.priority}
            </span>
          )}

          {task.dueDate && (
            <span className={styles.dueDate}>
              <svg width="14" height="14">
                <use href={`${sprite}#icon-calendar`}></use>
              </svg>
              {formatDate(task.dueDate)}
            </span>
          )}
        </div>
      </div>

      {showEditModal && (
        <EditTaskModal
          task={task}
          onClose={() => setShowEditModal(false)}
          onTaskUpdated={handleTaskUpdated}
        />
      )}
    </>
  );
}

export default CardItem;
