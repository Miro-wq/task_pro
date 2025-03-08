import React from "react";
import CardItem from "../CardItem/CardItem";
import styles from "./Column.module.css";

function Column({ title, tasks, boardId }) {
  // `boardId` se pote folosi pt un nou task direct în coloana

  const handleAddTask = () => {};

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
    </div>
  );
}

export default Column;
