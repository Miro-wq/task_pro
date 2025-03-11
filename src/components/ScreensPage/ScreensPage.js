import React, { useState, useEffect, useContext } from "react";
import Column from "../Column/Column";
import styles from "./ScreensPage.module.css";
import { getTasks, getColumns, createColumn } from "../../services/api";
import { BoardContext } from "../../context/BoardContext";
import AddColumnModal from "../Modals/AddColumnModal";
import Loader from "../Loader/Loader";

function ScreensPage({ boardId }) {
  const [columns, setColumns] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAddColumnModal, setShowAddColumnModal] = useState(false);
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
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task._id === updatedTask._id ? updatedTask : task))
    );
  };

  const handleTaskDeleted = (taskId) => {
    setTasks(tasks.filter((task) => task._id !== taskId));
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
  console.log(currentBoard.background);

  if (!currentBoard) {
    return <p>Board not found</p>;
  }

  return (
    <>
      <div className={styles.nameBoard}>
        <h2 className={styles.screensTitle}>{currentBoard.name}</h2>
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
            tasks={tasks.filter((task) => task.columnId === column._id)}
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
