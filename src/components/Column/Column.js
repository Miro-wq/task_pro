import React, { useState } from "react";
import CardItem from "../CardItem/CardItem";
import styles from "./Column.module.css";
import AddTaskModal from "../Modal/AddTaskModal";
import { createTask } from "../../services/api";

function Column({ title, tasks, columnId, boardId, onTaskAdded }) {
  const [showAddTaskModal, setShowAddTaskModal] = useState(false);

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

  return (
    <div className={styles.column}>
      <h2 className={styles.columnTitle}>{title}</h2>

      <div className={styles.cardsContainer}>
        {tasks.map((task) => (
          <CardItem key={task._id} task={task} />
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
    </div>
  );
}

export default Column;
