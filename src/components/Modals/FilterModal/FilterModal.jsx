import React, { useState, useEffect, useRef } from "react";
import styles from "./FilterModal.module.css";
import sprite from "../../../assets/icons/icons.svg";

function FilterModal({ onApplyFilters }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPriority, setSelectedPriority] = useState(null);
  const [showAllOptions, setShowAllOptions] = useState(false);
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
        withoutpriority: newPriority === "withoutpriority",
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
        withoutpriority: false,
      },
    };

    onApplyFilters(filters);
  };

  const toggleShowAllOptions = (e) => {
    e.preventDefault();
    setShowAllOptions(!showAllOptions);
  };

  const initialOption = "low";

  return (
    <div className={styles.filterContainer} ref={dropdownRef}>
      <button
        className={styles.filterButton}
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg width="18" height="18">
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
                <a
                  href="#"
                  className={styles.showAll}
                  onClick={toggleShowAllOptions}
                >
                  {showAllOptions ? "Show less" : "Show all"}
                </a>
              </div>

              <div className={styles.priorityOptions}>
                <div
                  className={`${styles.priorityOption} ${
                    selectedPriority === initialOption ? styles.selected : ""
                  }`}
                  onClick={() => handlePriorityChange(initialOption)}
                >
                  <span className={styles.radioButton}>
                    {selectedPriority === initialOption && (
                      <span className={styles.radioInner}></span>
                    )}
                  </span>
                  <span
                    className={`${styles.colorCircle} ${styles.lowPriority}`}
                  ></span>
                  <span>Low</span>
                </div>

                {showAllOptions && (
                  <>
                    <div
                      className={`${styles.priorityOption} ${
                        selectedPriority === "withoutpriority"
                          ? styles.selected
                          : ""
                      }`}
                      onClick={() => handlePriorityChange("withoutpriority")}
                    >
                      <span className={styles.radioButton}>
                        {selectedPriority === "withoutpriority" && (
                          <span className={styles.radioInner}></span>
                        )}
                      </span>
                      <span
                        className={`${styles.colorCircle} ${styles.grayPriority}`}
                      ></span>
                      <span>Without priority</span>
                    </div>

                    <div
                      className={`${styles.priorityOption} ${
                        selectedPriority === "medium" ? styles.selected : ""
                      }`}
                      onClick={() => handlePriorityChange("medium")}
                    >
                      <span className={styles.radioButton}>
                        {selectedPriority === "medium" && (
                          <span className={styles.radioInner}></span>
                        )}
                      </span>
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
                      <span className={styles.radioButton}>
                        {selectedPriority === "high" && (
                          <span className={styles.radioInner}></span>
                        )}
                      </span>
                      <span
                        className={`${styles.colorCircle} ${styles.highPriority}`}
                      ></span>
                      <span>High</span>
                    </div>
                  </>
                )}
              </div>

              {/* Clear button */}
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
