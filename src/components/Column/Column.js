import React, { useState } from "react";
import CardItem from "../CardItem/CardItem";
import styles from "./Column.module.css";
import AddTaskModal from "../Modals/AddTaskModal";
import EditColumnModal from "../Modals/EditColumnModal/EditColumnModal";
import { createTask, deleteColumn } from "../../services/api";
import sprite from "../../assets/icons/icons.svg";

function Column({
  title,
  tasks,
  columnId,
  boardId,
  columns,
  onTaskAdded,
  onTaskUpdated,
  onTaskDeleted,
  onColumnDeleted,
  onColumnUpdated,
}) {
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);
  const [showEditColumnModal, setShowEditColumnModal] = useState(false);

  const handleAddTask = () => {
    setShowAddTaskModal(true);
  };

  const handleTaskAdded = async (token, columnId, taskData) => {
    try {
      const response = await createTask(token, columnId, taskData);
      if (onTaskAdded) {
        onTaskAdded(response.data);
      }
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleDeleteColumn = async () => {
    try {
      const token = localStorage.getItem("token");
      await deleteColumn(token, columnId);
      if (onColumnDeleted) {
        onColumnDeleted(columnId);
      }
    } catch (error) {
      console.error("Error deleting column:", error);
    }
  };

  return (
    <div className={styles.column}>
      <div className={styles.columnHeader}>
        <h2 className={styles.columnTitle}>{title}</h2>
        <div className={styles.columnActions}>
          <button
            className={styles.actionButton}
            onClick={() => setShowEditColumnModal(true)}
            title="Edit Column"
          >
            <svg width="18" height="18">
              <use href={`${sprite}#icon-pencil`}></use>
            </svg>
          </button>
          <button
            className={styles.actionButton}
            onClick={handleDeleteColumn}
            title="Delete Column"
          >
            <svg width="18" height="18">
              <use href={`${sprite}#icon-trash`}></use>
            </svg>
          </button>
        </div>
      </div>

      <div className={styles.cardsContainer}>
        {tasks.map((task) => (
          <CardItem
            key={task._id}
            task={task}
            columns={columns}
            onTaskUpdated={onTaskUpdated}
            onTaskDeleted={onTaskDeleted}
          />
        ))}
      </div>

      <button className={styles.addCardButton} onClick={handleAddTask}>
        <span className={styles.plusSignModal}>+</span>
        Add another card
      </button>

      {showAddTaskModal && (
        <AddTaskModal
          onClose={() => setShowAddTaskModal(false)}
          onAdd={handleTaskAdded}
          columnId={columnId}
        />
      )}

      {showEditColumnModal && (
        <EditColumnModal
          column={{ _id: columnId, title }}
          onClose={() => setShowEditColumnModal(false)}
          onColumnUpdated={onColumnUpdated}
        />
      )}
    </div>
  );
}

export default Column;
