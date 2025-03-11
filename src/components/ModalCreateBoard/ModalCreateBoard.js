import React, { useState, useContext } from "react";
import styles from "./ModalCreateBoard.module.css";
import { BoardContext } from "../../context/BoardContext";
import sprite from "../../assets/icons/icons.svg";

function ModalCreateBoard({ onClose }) {
  const { createBoard } = useContext(BoardContext);
  const [boardName, setBoardName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [selectedBg, setSelectedBg] = useState(null);

  const icons = [
    "icon-fourCircles",
    "icon-star",
    "icon-loading",
    "icon-puzzlePiece",
    "icon-lightning",
    "icon-threeCircles",
    "icon-hexagon",
  ];

  const backgrounds = [
    "abstract",
    "baloon-2",
    "baloon",
    "blue-water",
    "cactus",
    "canyon",
    "diego-night",
    "diego",
    "flowers",
    "green",
    "moon-2",
    "moon",
    "night",
    "sail",
    "shore",
    "sky",
  ];

  const handleCreate = () => {
    if (!boardName.trim()) {
      alert("Please enter a board title");
      return;
    }
    createBoard(boardName, selectedIcon, selectedBg);
    onClose();
  };
  // momentan pagiane/modalu e pentru test, trebuie mai modificata
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          <svg width="18" height="18">
            <use href={`${sprite}#icon-closeBtn`}></use>
          </svg>
        </button>

        <h2 className={styles.title}>New board</h2>

        <input
          className={styles.inputTitle}
          type="text"
          placeholder="Title"
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
        />

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Icons</h3>
          <div className={styles.iconsContainer}>
            {icons.map((icon) => (
              <button
                key={icon}
                className={`${styles.iconItem} ${selectedIcon === icon ? styles.selected : ""
                  }`}
                onClick={() => setSelectedIcon(icon)}
                type="button"
              >
                <svg width="18" height="18">
                  <use href={`${sprite}#${icon}`}></use>
                </svg>
              </button>
            ))}
          </div>
        </div>

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Background</h3>
          <div className={styles.backgroundContainer}>
            {backgrounds.map((bg) => (
              <div
                key={bg}
                className={`${styles.bgItem} ${selectedBg === bg ? styles.selected : ""
                  }`}
                style={{
                  backgroundImage: `url("/assets/images/${bg}.png")`,
                }}
                onClick={() => setSelectedBg(bg)}
              />
            ))}
          </div>
        </div>

        <button className={styles.createBtn} onClick={handleCreate}>
          <span className={styles.plusSignModal}>+</span>
          Create
        </button>
      </div>
    </div>
  );
}

export default ModalCreateBoard;
