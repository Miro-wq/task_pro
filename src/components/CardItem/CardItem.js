import React, { useState, useContext } from "react";
import styles from "./CardItem.module.css";
import EditTaskModal from "../Modals/EditTaskModal/EditTaskModal";
import MoveTaskModal from "../Modals/MoveTaskModal/MoveTaskModal";
import { deleteTask } from "../../services/api";
import sprite from "../../assets/icons/icons.svg";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";

function CardItem({ task, columns, onTaskUpdated, onTaskDeleted }) {
  const{theme} = useContext(ThemeContext);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showMoveModal, setShowMoveModal] = useState(false);

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
      case "without priority":
        return styles.withoutPriority;
      default:
        return styles.mediumPriority;
    }
  };

  // Handler pentru ștergere task
  const handleDeleteTask = async () => {
    try {
      const token = localStorage.getItem("token");
      await deleteTask(token, task.columnId, task._id);
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
      onTaskUpdated(updatedTask._id);
    }
  };

  return (
    <>
      <div className={styles.card} style={{background:theme.sidebarBackground}}>
        <div className={styles.cardHeader}>
          <div
            className={`${styles.priorityIndicator} ${getPriorityColor(
              task.priority
            )}`}
          ></div>
          <div className={styles.cardActions}>
            <button
              className={styles.actionButton} style = {{background: theme.sidebarBackground}}
              onClick={() => setShowMoveModal(true)}
              title="Move Task"
            >
              <svg width="18" height="18">
                <use href={`${sprite}#icon-entry`}></use>
              </svg>
            </button>
            <button
              className={styles.actionButton} style = {{background: theme.sidebarBackground}}
              onClick={() => setShowEditModal(true)}
              title="Edit Task"
            >
              <svg width="18" height="18">
                <use href={`${sprite}#icon-pencil`}></use>
              </svg>
            </button>
            <button
              className={styles.actionButton} style = {{background: theme.sidebarBackground}}
              onClick={handleDeleteTask}
              title="Delete Task"
            >
              <svg width="18" height="18">
                <use href={`${sprite}#icon-trash`}></use>
              </svg>
            </button>
          </div>
        </div>

        <h3 className={styles.cardTitle} style={{color: theme.text}}>{task.title}</h3>

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
              <svg
                className={styles.icon}
                width="14"
                height="14"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentColor"
                  d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V8h16v13z"
                />
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

      {showMoveModal && (
        <MoveTaskModal
          task={task}
          columns={columns}
          onClose={() => setShowMoveModal(false)}
          onTaskMoved={handleTaskUpdated}
        />
      )}
    </>
  );
}

export default CardItem;
