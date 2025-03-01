import React, { useState, useContext } from 'react';
import styles from './ModalCreateBoard.module.css';
import { BoardContext } from '../../context/BoardContext';

function ModalCreateBoard({ onClose }) {
    const { createBoard } = useContext(BoardContext);
    const [boardName, setBoardName] = useState('');
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [selectedBg, setSelectedBg] = useState(null);

    const handleCreate = () => {
        if (!boardName.trim()) {
            alert('Please enter a board title');
            return;
        }
        createBoard(boardName);
        onClose();
    };
// momentan pagiane/modalu e pentru test, trebuie mai modificata
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2 className={styles.title}>New board</h2>

                <input
                    className={styles.inputTitle}
                    type="text"
                    placeholder="Title"
                    value={boardName}
                    onChange={(e) => setBoardName(e.target.value)}
                />

                <div className={styles.section}>
                    <h3>Icons</h3>
                    <div className={styles.iconsContainer}>
                        {/* se pute un array de icoane și un .map */}
                        <span
                            className={`${styles.iconItem} ${selectedIcon === '⚙️' ? styles.selected : ''}`}
                            onClick={() => setSelectedIcon('⚙️')}
                        >
                            ⚙️
                        </span>
                        <span
                            className={`${styles.iconItem} ${selectedIcon === '⚡️' ? styles.selected : ''}`}
                            onClick={() => setSelectedIcon('⚡️')}
                        >
                            ⚡️
                        </span>
                        <span
                            className={`${styles.iconItem} ${selectedIcon === '🌎' ? styles.selected : ''}`}
                            onClick={() => setSelectedIcon('🌎')}
                        >
                            🌎
                        </span>
                        {/* ......etc plm */}
                    </div>
                </div>

                <div className={styles.section}>
                    <h3>Background</h3>
                    <div className={styles.backgroundContainer}>
                        {/* array de imagini afisate cu .map */}
                        <div
                            className={`${styles.bgItem} ${selectedBg === 'bg1' ? styles.selected : ''}`}
                            style={{ backgroundImage: `url('/assets/bg1.jpg')` }}
                            onClick={() => setSelectedBg('bg1')}
                        />
                        <div
                            className={`${styles.bgItem} ${selectedBg === 'bg2' ? styles.selected : ''}`}
                            style={{ backgroundImage: `url('/assets/bg2.jpg')` }}
                            onClick={() => setSelectedBg('bg2')}
                        />
                        {/* ...etc */}
                    </div>
                </div>

                <div className={styles.buttonsRow}>
                    <button className={styles.createBtn} onClick={handleCreate}>
                        + Create
                    </button>
                    <button className={styles.closeBtn} onClick={onClose}>
                        X
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalCreateBoard;
