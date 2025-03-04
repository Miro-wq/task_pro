import React from 'react';
import CardItem from '../CardItem/CardItem';
import styles from './Column.module.css';

function Column({ title, tasks, status, boardId }) {
  // `status` pt a sti ce coloană este
  // `boardId` se pote folosi pt un nou task direct în coloana

  const handleAddTask = () => {
    // luat din POST /boards/:boardId/tasks
    console.log(`Add task in column: ${status} for board ${boardId}`);
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
    </div>
  );
}

export default Column;
