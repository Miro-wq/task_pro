import React, { useContext, useState } from 'react';
import styles from './SideBar.module.css';
import cactus from '../../assets/logo/cactus.png';
import ModalCreateBoard from '../ModalCreateBoard/ModalCreateBoard';
import BoardItem from '../BoardItem/BoardItem';
import { BoardContext } from '../../context/BoardContext';
import { ThemeContext } from '../../context/ThemeContext/ThemeContext.jsx';



function Sidebar({ isOpen, onSelectBoard, onClose }) {
    const { theme } = useContext(ThemeContext);
    const { boards } = useContext(BoardContext);
    const [showModal, setShowModal] = useState(false);
    const [activeBoardId, setActiveBoardId] = useState(null);

    const handleSelectBoard = (boardId) => {
        setActiveBoardId(boardId);
        onSelectBoard(boardId);
        onClose();
        if (onSelectBoard) {
            onSelectBoard(boardId);
        }
    };

    return (
        <div className={`${styles.sidebar}  ${isOpen ? styles.open : ''}`} style = {{background: theme.sidebarBackground}}>
            <h1 className={styles.logo} style = {{color:theme.text}}>
                <svg className={styles.icon}>
                    <use xlinkHref="/assets/icons/symbol-defs.svg#icon-black_icon" />
                </svg>
                Task Pro</h1>

            <div className={styles.myBoardsSection}>
                <h2 className={styles.myBoardsTitle} style = {{color:theme.text}}>My boards</h2>
                <hr className={styles.divider} />

                <div className={styles.createBoardContainer}>
                    <span className={styles.createBoardText} style = {{color:theme.text}}>Create a new board</span>
                    <button className={styles.createBoardButton} onClick={() => setShowModal(true)}>
                        <span className={styles.plusSign}>+</span>
                    </button>
                </div>
                <hr className={styles.divider} />

                {/* lista de boards cu activ */}
                <div className={styles.boardsList} >
                    {boards.map((b) => {
                        const isActive = b._id === activeBoardId;
                        return (
                            <div
                                key={b._id}
                                className={`${styles.sideBoards} ${isActive ? styles.active : ''}`} style = {{color: theme.sideBoards}} 
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

            <div className={styles.block} style = {{background: theme.background}}>
                <div className={styles.blockContent}>
                    <img src={cactus} alt="Cactus" className={styles.cactusImage} />
                    <div className={styles.blockText}>
                        <p className={styles.blockDescription} style = {{color:theme.text}}>If you need help with <span className={styles.task}>TaskPro</span>, check out our support resources or reach out to our customer support team.</p>
                    </div>
                    <div className={styles.blockButtonContainer}>
                        <div className={styles.helpContainer}>

                            {/* trebuie vazut daca e buton cu link sau lin k simplu */}
                            <div className={styles.helpIcon} style = {{color:theme.text,border:theme.helpIcon}}>?</div>
                            <span className={styles.helpText} style = {{color:theme.text}}>Need help?</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Sidebar;