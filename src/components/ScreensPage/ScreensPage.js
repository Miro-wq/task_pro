import React, { useState, useEffect, useContext } from "react";
import Column from "../Column/Column";
import styles from "./ScreensPage.module.css";
import { getTasks, getColumns, createColumn } from "../../services/api";
import { BoardContext } from "../../context/BoardContext";
import AddColumnModal from "../Modals/AddColumnModal";
import Loader from "../Loader/Loader";
import FilterModal from "../Modals/FilterModal/FilterModal";
import { ThemeContext } from "../../context/ThemeContext/ThemeContext";

function ScreensPage({ boardId }) {
  const { theme } = useContext(ThemeContext);
  const [columns, setColumns] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddColumnModal, setShowAddColumnModal] = useState(false);
  const [activeFilter, setActiveFilter] = useState(null);
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
    if (!activeFilter) {
      setFilteredTasks([...filteredTasks, newTask]);
    } else {
      const taskPriority =
        newTask.priority?.toLowerCase() || "without priority";
      if (activeFilter === taskPriority.replace(/\s+/g, "")) {
        setFilteredTasks([...filteredTasks, newTask]);
      }
    }
  };

  const handleTaskUpdated = async (taskId) => {
    try {
      const token = localStorage.getItem("token");

      // Refresh taskuri si coloane
      let allTasks = [];
      for (const column of columns) {
        const tasksResponse = await getTasks(token, column._id);
        allTasks = [...allTasks, ...tasksResponse.data];
      }
      setTasks(allTasks);

      // Applica filtru pe taskurile updated
      if (activeFilter) {
        const filtered = allTasks.filter((task) => {
          const taskPriority =
            task.priority?.toLowerCase() || "without priority";
          return activeFilter === taskPriority.replace(/\s+/g, "");
        });
        setFilteredTasks(filtered);
      } else {
        setFilteredTasks(allTasks);
      }
    } catch (error) {
      console.error("Error refreshing tasks:", error);
    }
  };

  const handleTaskDeleted = (taskId) => {
    setTasks(tasks.filter((task) => task._id !== taskId));
    setFilteredTasks(filteredTasks.filter((task) => task._id !== taskId));
  };

  const handleApplyFilters = (filters) => {
    // Get the selected priority
    const selectedPriorities = Object.keys(filters.priority).filter(
      (key) => filters.priority[key]
    );

    if (selectedPriorities.length === 0) {
      setActiveFilter(null);
      setFilteredTasks(tasks);
    } else {
      setActiveFilter(selectedPriorities[0]);
      const filtered = tasks.filter((task) => {
        const taskPriority = task.priority?.toLowerCase() || "without priority";
        console.log({
          activeFilter,
          taskPriority: (
            task.priority?.toLowerCase() || "without priority"
          ).replace(/\s+/g, ""),
        });
        return selectedPriorities.includes(taskPriority.replace(/\s+/g, ""));
      });
      setFilteredTasks(filtered);
    }
  };

  if (!boardId) {
    return (
      <div className={styles.noBoardSelected}>
        <p className={styles.description} style={{ color: theme.text }}>
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
        <h2 className={styles.screensTitle} style={{ color: theme.text }}>
          {currentBoard.name}
        </h2>
        <div className={styles.filterWrapper}>
          <FilterModal onApplyFilters={handleApplyFilters} />
        </div>
      </div>

      <div
        className={styles.screensPageContainer}
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
        <div className={styles.screensPage}>
          {columns.map((column) => (
            <Column
              key={column._id}
              title={column.title}
              tasks={filteredTasks.filter(
                (task) => task.columnId === column._id
              )}
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
              style={{ background: theme.sidebarBackground, color: theme.text }}
              onClick={() => setShowAddColumnModal(true)}
            >
              <span
                className={styles.plusSignModal}
                style={{
                  background: theme.plusSignModal,
                  color: theme.textPlusSignModal,
                }}
              >
                +
              </span>
              Add another column
            </button>
          </div>
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
