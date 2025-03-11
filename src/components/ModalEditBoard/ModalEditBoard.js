import React, { useState, useContext } from "react";
import styles from "./ModalEditBoard.module.css";
import { BoardContext } from "../../context/BoardContext";
import sprite from "../../assets/images/icons.svg";

function ModalEditBoard({ board, onClose }) {
  const { updateBoard } = useContext(BoardContext);

  const [editName, setEditName] = useState(board.name);
  const [selectedIcon, setSelectedIcon] = useState(board.icon || null);
  const [selectedBg, setSelectedBg] = useState(board.background || null);

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

  const handleSave = () => {
    if (!editName.trim()) {
      alert("Please enter a board title");
      return;
    }
    updateBoard(board._id, editName, selectedIcon, selectedBg);
    onClose();
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          <svg width="18" height="18">
            <use href={`${sprite}#icon-closeBtn`}></use>
          </svg>
        </button>

        <h2 className={styles.title}>Edit board</h2>

        <input
          className={styles.inputTitle}
          type="text"
          placeholder="Board name"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
        />

        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Icons</h3>
          <div className={styles.iconsContainer}>
            {icons.map((icon) => (
              <button
                key={icon}
                className={`${styles.iconItem} ${
                  selectedIcon === icon ? styles.selected : ""
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
                className={`${styles.bgItem} ${
                  selectedBg === bg ? styles.selected : ""
                }`}
                style={{ backgroundImage: `url('/assets/images/${bg}.png')` }}
                onClick={() => setSelectedBg(bg)}
              />
            ))}
          </div>
        </div>

        <button className={styles.editBtn} onClick={handleSave}>
          <span className={styles.plusSignModal}>+</span>
          Edit
        </button>
      </div>
    </div>
  );
}

export default ModalEditBoard;
