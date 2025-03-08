import React, { useState } from "react";
import styles from "./FilterModal.module.css";
import sprite from "../....//assets/images/icons.svg";

function FilterModal({ onClose, onApplyFilters }) {
  const [filters, setFilters] = useState({
    priority: {
      low: false,
      medium: false,
      high: false,
    },
    status: {
      todo: false,
      inProgress: false,
      done: false,
    },
  });

  const handlePriorityChange = (priority) => {
    setFilters({
      ...filters,
      priority: {
        ...filters.priority,
        [priority]: !filters.priority[priority],
      },
    });
  };

  const handleStatusChange = (status) => {
    setFilters({
      ...filters,
      status: {
        ...filters.status,
        [status]: !filters.status[status],
      },
    });
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  const clearFilters = () => {
    setFilters({
      priority: {
        low: false,
        medium: false,
        high: false,
      },
      status: {
        todo: false,
        inProgress: false,
        done: false,
      },
    });
  };

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h2>Filters</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <svg width="18" height="18">
              <use href={`${sprite}#icon-close`}></use>
            </svg>
          </button>
        </div>

        <div className={styles.filterForm}>
          <div className={styles.filterSection}>
            <h3 className={styles.filterTitle}>Label color</h3>
            <div className={styles.colorFilters}>
              <label className={styles.colorOption}>
                <input
                  type="checkbox"
                  checked={filters.priority.low}
                  onChange={() => handlePriorityChange("low")}
                />
                <span
                  className={`${styles.colorDot} ${styles.lowPriority}`}
                ></span>
                <span>Low</span>
              </label>

              <label className={styles.colorOption}>
                <input
                  type="checkbox"
                  checked={filters.priority.medium}
                  onChange={() => handlePriorityChange("medium")}
                />
                <span
                  className={`${styles.colorDot} ${styles.mediumPriority}`}
                ></span>
                <span>Medium</span>
              </label>

              <label className={styles.colorOption}>
                <input
                  type="checkbox"
                  checked={filters.priority.high}
                  onChange={() => handlePriorityChange("high")}
                />
                <span
                  className={`${styles.colorDot} ${styles.highPriority}`}
                ></span>
                <span>High</span>
              </label>
            </div>
          </div>

          <div className={styles.filterSection}>
            <h3 className={styles.filterTitle}>Status</h3>
            <div className={styles.statusFilters}>
              <label className={styles.statusOption}>
                <input
                  type="checkbox"
                  checked={filters.status.todo}
                  onChange={() => handleStatusChange("todo")}
                />
                <span>To Do</span>
              </label>

              <label className={styles.statusOption}>
                <input
                  type="checkbox"
                  checked={filters.status.inProgress}
                  onChange={() => handleStatusChange("inProgress")}
                />
                <span>In Progress</span>
              </label>

              <label className={styles.statusOption}>
                <input
                  type="checkbox"
                  checked={filters.status.done}
                  onChange={() => handleStatusChange("done")}
                />
                <span>Done</span>
              </label>
            </div>
          </div>

          <div className={styles.filterActions}>
            <button className={styles.clearButton} onClick={clearFilters}>
              Clear filters
            </button>
            <button className={styles.applyButton} onClick={handleApply}>
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FilterModal;
