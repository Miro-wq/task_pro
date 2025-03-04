import React from 'react';
import styles from './CardItem.module.css';

function CardItem({ task }) {

  return (
    <div className={styles.card}>
      <h3 className={styles.cardTitle}>{task.title}</h3>
      <p className={styles.cardDescription}>{task.description}</p>
      
      {/* aici se pot afisa restul de dueDate, priority, samd pt taskuri */}
      <div className={styles.cardFooter}>
        <span className={styles.priority}>{task.priority}</span>
        <span className={styles.dueDate}>{task.dueDate}</span>
      </div>
    </div>
  );
}

export default CardItem;
