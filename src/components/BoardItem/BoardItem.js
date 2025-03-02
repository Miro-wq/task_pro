import React, { useContext, useState } from 'react';
import { BoardContext } from '../../context/BoardContext';
import styles from './BoardItem.module.css';

function BoardItem({ board, isActive, onSelect }) {
    const [showEditInput, setShowEditInput] = useState(false);
    const [editName, setEditName] = useState(board.name);

    const { updateBoard, deleteBoard } = useContext(BoardContext);

  // cand useru face click pe "editare"
    const handleEditClick = (e) => {
        e.stopPropagation(); // opreste propagarea evenimentului
        setShowEditInput(true);
      };

  // confirm editarea (save)
  const handleEditConfirm = () => {
    updateBoard(board._id, editName); // apel direct la context
    setShowEditInput(false);
  };

  // anuleaza editarea (daCa trebuie)
  const handleEditCancel = () => {
    setEditName(board.name); // revine la vechiu nume
    setShowEditInput(false);
  };

    // sterge boardul
    const handleDeleteClick = (e) => {
        e.stopPropagation();
        deleteBoard(board._id); // apel direct la context
      };

  return (
    <div
      className={`${styles.boardItem} ${isActive ? styles.active : ''}`}
      onClick={() => onSelect(board._id)}
    >
      {showEditInput ? (
        <div className={styles.editContainer}>
          <input
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onClick={(e) => e.stopPropagation()}
            className={styles.editInput}
          />
          <button className={styles.saveBtn} onClick={handleEditConfirm}>
            Save
          </button>
          <button className={styles.cancelBtn} onClick={(e) => {
            e.stopPropagation();
            handleEditCancel();
          }}>
            Cancel
          </button>
        </div>
      ) : (
        <span className={styles.boardName}>{board.name}</span>
      )}

      {/* btoanele apar doar dacă nu esti în modul edit */}
      {!showEditInput && (
        <div className={styles.actions}>
          <button className={styles.editBtn} onClick={handleEditClick}>
            +++
          </button>
          <button className={styles.deleteBtn} onClick={handleDeleteClick}>
            ---
          </button>
        </div>
      )}
    </div>
  );
}

export default BoardItem;
