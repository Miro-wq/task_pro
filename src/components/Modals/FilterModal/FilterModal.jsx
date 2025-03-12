import React, { useState, useEffect, useRef } from "react";
import styles from "./FilterModal.module.css";
import sprite from "../../../assets/icons/icons.svg";

function FilterModal({ onApplyFilters }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handlePriorityChange = (priority) => {
    let newPriority = priority === selectedPriority ? null : priority;
    setSelectedPriority(newPriority);

    const filters = {
      priority: {
        low: newPriority === "low",
        medium: newPriority === "medium",
        high: newPriority === "high",
        without: newPriority === "without",
      },
    };

    onApplyFilters(filters);
  };

  const handleClearFilters = () => {
    setSelectedPriority(null);

    const filters = {
      priority: {
        low: false,
        medium: false,
        high: false,
        without: false,
      },
    };

    onApplyFilters(filters);
  };

  return (
    <div className={styles.filterContainer} ref={dropdownRef}>
      <button
        className={styles.filterButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg width="16" height="16">
          <use href={`${sprite}#icon-filter`}></use>
        </svg>
        Filters
      </button>

      {isOpen && (
        <div className={styles.filterDropdown}>
          <div className={styles.filterHeader}>
            <h3>Filters</h3>
            <button
              className={styles.closeButton}
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </div>

          <div className={styles.filterContent}>
            <div className={styles.filterSection}>
              <div className={styles.labelColorHeader}>
                <span>Label color</span>
              </div>

              <div className={styles.priorityOptions}>
                <div
                  className={`${styles.priorityOption} ${
                    selectedPriority === "without" ? styles.selected : ""
                  }`}
                  onClick={() => handlePriorityChange("without")}
                >
                  <span
                    className={`${styles.colorRadio} ${styles.withoutPriority}`}
                  >
                    {selectedPriority === "without" && (
                      <span className={styles.radioCheck}></span>
                    )}
                  </span>
                  <span>Without Priority</span>
                </div>

                <div
                  className={`${styles.priorityOption} ${
                    selectedPriority === "low" ? styles.selected : ""
                  }`}
                  onClick={() => handlePriorityChange("low")}
                >
                  <span
                    className={`${styles.colorRadio} ${styles.lowPriority}`}
                  >
                    {selectedPriority === "low" && (
                      <span className={styles.radioCheck}></span>
                    )}
                  </span>
                  <span>Low</span>
                </div>

                <div
                  className={`${styles.priorityOption} ${
                    selectedPriority === "medium" ? styles.selected : ""
                  }`}
                  onClick={() => handlePriorityChange("medium")}
                >
                  <span
                    className={`${styles.colorRadio} ${styles.mediumPriority}`}
                  >
                    {selectedPriority === "medium" && (
                      <span className={styles.radioCheck}></span>
                    )}
                  </span>
                  <span>Medium</span>
                </div>

                <div
                  className={`${styles.priorityOption} ${
                    selectedPriority === "high" ? styles.selected : ""
                  }`}
                  onClick={() => handlePriorityChange("high")}
                >
                  <span
                    className={`${styles.colorRadio} ${styles.highPriority}`}
                  >
                    {selectedPriority === "high" && (
                      <span className={styles.radioCheck}></span>
                    )}
                  </span>
                  <span>High</span>
                </div>
              </div>

              {selectedPriority && (
                <div className={styles.filterActions}>
                  <button
                    className={styles.clearButton}
                    onClick={handleClearFilters}
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterModal;
