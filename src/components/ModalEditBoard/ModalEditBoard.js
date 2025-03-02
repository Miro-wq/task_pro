import React, { useState, useContext } from 'react';
import styles from './ModalEditBoard.module.css';
import { BoardContext } from '../../context/BoardContext';

function ModalEditBoard({ board, onClose }) {
  const { updateBoard } = useContext(BoardContext);

  const [editName, setEditName] = useState(board.name);
  const [selectedIcon, setSelectedIcon] = useState(board.icon || null);
  const [selectedBg, setSelectedBg] = useState(board.background || null);

//   const handleEdit = () => {
//     updateBoard(board._id, editName );
//     onClose();
//   };

  const handleSave = () => {
    // Apelează updateBoard din context
    updateBoard(board._id, editName);
    // Închide modalul
    onClose();
  };



  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 className={styles.title}>Edit board</h2>

        <input
          className={styles.inputTitle}
          type="text"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          placeholder="Board name"
        />

        <div className={styles.section}>
          <h3>Icons</h3>
          <div className={styles.iconsContainer}>
            {/* aici pt .map la lista de icoane */}
            <span
              className={`${styles.iconItem} ${
                selectedIcon === '⚙️' ? styles.selected : ''
              }`}
              onClick={() => setSelectedIcon('⚙️')}
            >
              ⚙️
            </span>
            {/* alte icoane */}
          </div>
        </div>

        <div className={styles.section}>
          <h3>Background</h3>
          <div className={styles.backgroundContainer}>
            {/* la fel, .map la imagini */}
            <div
              className={`${styles.bgItem} ${
                selectedBg === 'bg1' ? styles.selected : ''
              }`}
              style={{ backgroundImage: `url('/assets/bg1.jpg')` }}
              onClick={() => setSelectedBg('bg1')}
            />
            {/* etc. */}
          </div>
        </div>

        <div className={styles.buttonsRow}>
          <button className={styles.editBtn} onClick={handleSave}>
            <span className={styles.plusSignModal}>+</span>
            Edit
          </button>
          <button className={styles.closeBtn} onClick={onClose}>
            x
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalEditBoard;
