import React, { useState } from "react";
import styles from "./CardItem.module.css";
import EditTaskModal from "../Modals/EditTaskModal/EditTaskModal";
import MoveTaskModal from "../Modals/MoveTaskModal/MoveTaskModal";
import { deleteTask } from "../../services/api";
import sprite from "../../assets/icons/icons.svg";

function CardItem({ task, columns, onTaskUpdated, onTaskDeleted }) {
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

  //pentru borderul acela din stanga
  function getPriorityColorValue(priority) {
    switch (priority?.toLowerCase()) {
      case "low":
        return "#8fa1d0";
      case "medium":
        return "#e09cb5";
      case "high":
        return "#bedbb0";
      default:
        return "#6e6e6e";
    }
  }

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
      <div className={styles.card}
        style={{
          borderLeft: `4px solid ${getPriorityColorValue(task.priority)}`,
        }}
      >
        <div className={styles.cardHeader}>
          <div
            className={`${styles.priorityIndicator} ${getPriorityColor(
              task.priority
            )}`}
          ></div>
        </div>

        <h3 className={styles.cardTitle}>{task.title}</h3>

        {task.description && (
          <p className={styles.cardDescription}>{task.description}</p>
        )}

        <div className={styles.cardFooter}>
          <div className={styles.cardInfo}>
            <p className={styles.info}>Priority</p>
            {task.priority && (
              <span
                className={`${styles.priority} ${getPriorityColor(
                  task.priority
                )}`}
              >
                {task.priority}
              </span>
            )}
          </div>

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

          <div className={styles.cardActions}>
            <button
              className={styles.actionButton}
              onClick={() => setShowMoveModal(true)}
              title="Move Task"
            >
              <svg width="18" height="18">
                <use href={`${sprite}#icon-entry`}></use>
              </svg>
            </button>
            <button
              className={styles.actionButton}
              onClick={() => setShowEditModal(true)}
              title="Edit Task"
            >
              <svg width="18" height="18">
                <use href={`${sprite}#icon-pencil`}></use>
              </svg>
            </button>
            <button
              className={styles.actionButton}
              onClick={handleDeleteTask}
              title="Delete Task"
            >
              <svg width="18" height="18">
                <use href={`${sprite}#icon-trash`}></use>
              </svg>
            </button>
          </div>
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
