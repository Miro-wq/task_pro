import React, { useContext, useState } from 'react';
import styles from './SideBar.module.css';
import cactus from '../../assets/images/cactus.png';
import ModalCreateBoard from '../ModalCreateBoard/ModalCreateBoard';
import BoardItem from '../BoardItem/BoardItem';
import { BoardContext } from '../../context/BoardContext';



function Sidebar({ onSelectBoard }) {
    const { boards } = useContext(BoardContext);
    const [showModal, setShowModal] = useState(false);
    const [activeBoardId, setActiveBoardId] = useState(null);

    const handleSelectBoard = (boardId) => {
        setActiveBoardId(boardId);
        if (onSelectBoard) {
            onSelectBoard(boardId);
        }
    };

    return (
        <div className={styles.sidebar}>
            <h1 className={styles.logo}>
                <svg className={styles.icon}>
                    <use xlinkHref="/assets/icons/symbol-defs.svg#icon-black_icon" />
                </svg>
                Task Pro</h1>

            <div className={styles.myBoardsSection}>
                <h2 className={styles.myBoardsTitle}>My boards</h2>
                <hr className={styles.divider} />

                <div className={styles.createBoardContainer}>
                    <span className={styles.createBoardText}>Create a new board</span>
                    <button className={styles.createBoardButton} onClick={() => setShowModal(true)}>
                        <span className={styles.plusSign}>+</span>
                    </button>
                </div>
                <hr className={styles.divider} />

                {/* lista de boards cu activ */}
                <div className={styles.boardsList}>
                    {boards.map((b) => {
                        const isActive = b._id === activeBoardId;
                        return (
                            <div
                                key={b._id}
                                className={`${styles.sideBoards} ${isActive ? styles.active : ''}`}
                            >
                                <BoardItem
                                    board={b}
                                    isActive={isActive}
                                    onSelect={handleSelectBoard}
                                />
                            </div>
                        );
                    })}
                </div>

                {/* modal pt creare board */}
                {showModal && <ModalCreateBoard onClose={() => setShowModal(false)} />}
            </div>

            <div className={styles.block}>
                <div className={styles.blockContent}>
                    <img src={cactus} alt="Cactus" className={styles.cactusImage} />
                    <div className={styles.blockText}>
                        <p className={styles.blockDescription}>If you need help with <span className={styles.task}>TaskPro</span>, check out our support resources or reach out to our customer support team.</p>
                    </div>
                    <div className={styles.blockButtonContainer}>
                        <div className={styles.helpContainer}>

                            {/* trebuie vazut daca e buton cu link sau lin k simplu */}
                            <div className={styles.helpIcon}>?</div>
                            <span className={styles.helpText}>Need help?</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;