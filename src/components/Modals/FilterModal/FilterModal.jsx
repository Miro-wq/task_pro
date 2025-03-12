import React, { useState } from "react";
import styles from "./FilterModal.module.css";
import sprite from "../../../assets/icons/icons.svg";

function FilterModal({ onClose, onApplyFilters }) {
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [showAll, setShowAll] = useState(false); // Adăugăm un state pentru a controla afișarea opțiunilor

  const handlePriorityChange = (priority) => {
    setSelectedPriority(priority);

    const filters = {
      priority: {
        low: priority === "low",
        medium: priority === "medium",
        high: priority === "high",
        withoutpriority: priority === "withoutpriority",
      },
    };

    onApplyFilters(filters); // Aplica filtrele imediat
    onClose(); // Închide modalul
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Filters</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <svg width="18" height="18">
              <use href={`${sprite}#icon-closeBtn`}></use>
            </svg>
          </button>
        </div>

        <div className={styles.filterForm}>
          <div className={styles.filterSection}>
            <h3 className={styles.filterTitle}>Priority</h3>
            <div className={styles.showAll}>
              <a href="#" onClick={() => setShowAll(!showAll)}>
                {showAll ? "Show less" : "Show all"}
              </a>
            </div>

            {showAll && (
              <div className={styles.priorityOptions}>
                <div
                  className={`${styles.priorityOption} ${
                    selectedPriority === "withoutpriority"
                      ? styles.selected
                      : ""
                  }`}
                  onClick={() => handlePriorityChange("withoutpriority")}
                >
                  <span
                    className={`${styles.colorCircle} ${styles.grayPriority}`}
                  ></span>
                  <span>Without priority</span>
                </div>

                <div
                  className={`${styles.priorityOption} ${
                    selectedPriority === "low" ? styles.selected : ""
                  }`}
                  onClick={() => handlePriorityChange("low")}
                >
                  <span
                    className={`${styles.colorCircle} ${styles.lowPriority}`}
                  ></span>
                  <span>Low</span>
                </div>

                <div
                  className={`${styles.priorityOption} ${
                    selectedPriority === "medium" ? styles.selected : ""
                  }`}
                  onClick={() => handlePriorityChange("medium")}
                >
                  <span
                    className={`${styles.colorCircle} ${styles.mediumPriority}`}
                  ></span>
                  <span>Medium</span>
                </div>

                <div
                  className={`${styles.priorityOption} ${
                    selectedPriority === "high" ? styles.selected : ""
                  }`}
                  onClick={() => handlePriorityChange("high")}
                >
                  <span
                    className={`${styles.colorCircle} ${styles.highPriority}`}
                  ></span>
                  <span>High</span>
                </div>
              </div>
            )}
          </div>

          <div className={styles.filterActions}>
            <button
              className={styles.clearButton}
              onClick={() => handlePriorityChange(null)}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterModal;
