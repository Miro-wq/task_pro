import React, { useState, useEffect, useContext } from "react";
import Column from "../Column/Column";
import styles from "./ScreensPage.module.css";
import { getTasks, getColumns, createColumn } from "../../services/api";
import { BoardContext } from "../../context/BoardContext";
import AddColumnModal from "../Modals/AddColumnModal";
import Loader from "../Loader/Loader";
import sprite from "../../assets/icons/icons.svg";

function ScreensPage({ boardId }) {
  const [columns, setColumns] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddColumnModal, setShowAddColumnModal] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    withoutPriority: false,
    low: false,
    medium: false,
    high: false,
  });
  const { boards } = useContext(BoardContext);

  useEffect(() => {
    if (!boardId) {
      return;
    }

    async function fetchData() {
      try {
        setLoading(true);
        setError("");
        const token = localStorage.getItem("token");

        //luam coloanele
        const columnsResponse = await getColumns(token, boardId);
        setColumns(columnsResponse.data);

        //luam taskurile
        let allTasks = [];
        for (const column of columnsResponse.data) {
          const tasksResponse = await getTasks(token, column._id);
          allTasks = [...allTasks, ...tasksResponse.data];
        }
        setTasks(allTasks);
        setFilteredTasks(allTasks);
      } catch (err) {
        console.error(err);
        setError("Could not fetch data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [boardId]);
  //pentru filters
  useEffect(() => {
    if (Object.values(activeFilters).every((filter) => !filter)) {
      // afiseaza toate
      setFilteredTasks(tasks);
    } else {
      // dupa prioritate
      const filtered = tasks.filter((task) => {
        const priority = task.priority?.toLowerCase() || "without priority";
        return activeFilters[priority.replace(" ", "")];
      });
      setFilteredTasks(filtered);
    }
  }, [tasks, activeFilters]);

  const handleAddColumn = async (token, boardId, columnData) => {
    try {
      const response = await createColumn(token, boardId, columnData);
      setColumns([...columns, response.data]);
    } catch (error) {
      console.error("Error adding column:", error);
    }
  };

  const handleColumnUpdated = (updatedColumn) => {
    setColumns(
      columns.map((col) =>
        col._id === updatedColumn._id ? updatedColumn : col
      )
    );
  };

  const handleColumnDeleted = (columnId) => {
    setColumns(columns.filter((col) => col._id !== columnId));
    setTasks(tasks.filter((task) => task.columnId !== columnId));
  };

  const handleTaskAdded = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const handleTaskUpdated = async (taskId) => {
    try {
      // ca sa afisez taskul editat
      const token = localStorage.getItem("token");
      const task = tasks.find((t) => t._id === taskId);

      if (task) {
        const columnId = task.columnId;
        const tasksResponse = await getTasks(token, columnId);

        // pentru movetask
        const otherTasks = tasks.filter((t) => t.columnId !== columnId);
        setTasks([...otherTasks, ...tasksResponse.data]);
      }
    } catch (error) {
      console.error("Error refreshing tasks:", error);
    }
  };

  const handleTaskDeleted = (taskId) => {
    setTasks(tasks.filter((task) => task._id !== taskId));
  };

  const handleFilterToggle = (priority) => {
    setActiveFilters((prev) => ({
      ...prev,
      [priority]: !prev[priority],
    }));
  };

  const clearFilters = () => {
    setActiveFilters({
      withoutPriority: false,
      low: false,
      medium: false,
      high: false,
    });
  };

  if (!boardId) {
    return (
      <div className={styles.noBoardSelected}>
        <p className={styles.description}>
          Before starting your project, it is essential{" "}
          <span className={styles.green}>to create a board</span> to visualize
          and track all the necessary tasks and milestones. This board serves as
          a powerful tool to organize the workflow and ensure effective
          collaboration among team members.
        </p>
      </div>
    );
  }

  if (loading) {
    return <Loader />;
  }
  if (error) return <div>{error}</div>;

  const currentBoard = boards.find((b) => b._id === boardId);

  if (!currentBoard) {
    return <p>Board not found</p>;
  }

  return (
    <>
      <div className={styles.nameBoard}>
        <h2 className={styles.screensTitle}>{currentBoard.name}</h2>

        <div className={styles.filterContainer}>
          <button
            className={styles.filterButton}
            onClick={() => setShowFilters(!showFilters)}
          >
            <svg width="18" height="18">
              <use href={`${sprite}#icon-filter`}></use>
            </svg>
            Filters
          </button>

          {showFilters && (
            <div className={styles.filterDropdown}>
              <div className={styles.filterHeader}>
                <h3>Label color</h3>
                <button
                  onClick={clearFilters}
                  className={styles.clearFiltersBtn}
                >
                  Show all
                </button>
              </div>

              <div className={styles.filterOptions}>
                <div className={styles.filterOption}>
                  <input
                    type="checkbox"
                    id="withoutPriority"
                    checked={activeFilters.withoutPriority}
                    onChange={() => handleFilterToggle("withoutPriority")}
                  />
                  <div
                    className={`${styles.colorCircle} ${styles.withoutPriorityColor}`}
                  ></div>
                  <label htmlFor="withoutPriority">Without priority</label>
                </div>

                <div className={styles.filterOption}>
                  <input
                    type="checkbox"
                    id="low"
                    checked={activeFilters.low}
                    onChange={() => handleFilterToggle("low")}
                  />
                  <div
                    className={`${styles.colorCircle} ${styles.lowColor}`}
                  ></div>
                  <label htmlFor="low">Low</label>
                </div>

                <div className={styles.filterOption}>
                  <input
                    type="checkbox"
                    id="medium"
                    checked={activeFilters.medium}
                    onChange={() => handleFilterToggle("medium")}
                  />
                  <div
                    className={`${styles.colorCircle} ${styles.mediumColor}`}
                  ></div>
                  <label htmlFor="medium">Medium</label>
                </div>

                <div className={styles.filterOption}>
                  <input
                    type="checkbox"
                    id="high"
                    checked={activeFilters.high}
                    onChange={() => handleFilterToggle("high")}
                  />
                  <div
                    className={`${styles.colorCircle} ${styles.highColor}`}
                  ></div>
                  <label htmlFor="high">High</label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        className={styles.screensPage}
        style={
          currentBoard.background
            ? {
                backgroundImage: `url("/assets/images/${currentBoard.background}.png")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }
            : {}
        }
      >
        {columns.map((column) => (
          <Column
            key={column._id}
            title={column.title}
            tasks={filteredTasks.filter((task) => task.columnId === column._id)}
            columnId={column._id}
            boardId={boardId}
            columns={columns}
            onTaskAdded={handleTaskAdded}
            onTaskUpdated={handleTaskUpdated}
            onTaskDeleted={handleTaskDeleted}
            onColumnUpdated={handleColumnUpdated}
            onColumnDeleted={handleColumnDeleted}
          />
        ))}
        <div className={styles.addColumnContainer}>
          <button
            className={styles.addColumnButton}
            onClick={() => setShowAddColumnModal(true)}
          >
            <span className={styles.plusSignModal}>+</span>
            Add another column
          </button>
        </div>
      </div>

      {showAddColumnModal && (
        <AddColumnModal
          onClose={() => setShowAddColumnModal(false)}
          onAdd={handleAddColumn}
          boardId={boardId}
        />
      )}
    </>
  );
}

export default ScreensPage;
