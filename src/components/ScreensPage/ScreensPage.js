import React, { useState, useEffect, useContext } from "react";
// import { useParams } from 'react-router-dom';
import Column from "../Column/Column";
import styles from "./ScreensPage.module.css";
import { getTasks, getColumns, createColumn } from "../../services/api";
import { BoardContext } from "../../context/BoardContext";

function ScreensPage({ boardId }) {
  const [columns, setColumns] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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
        const tasksResponse = await getTasks(token, boardId);
        setTasks(tasksResponse.data);
      } catch (err) {
        console.error(err);
        setError("Could not fetch data");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [boardId]);

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

  if (loading) return <div>Loading columns...</div>;
  if (error) return <div>{error}</div>;

  const currentBoard = boards.find((b) => b._id === boardId);

  if (!currentBoard) {
    return <p>Board not found</p>;
  }

  return (
    <>
      <div className={styles.nameBoard}>
        <h2 className={styles.screensTitle}>{currentBoard.name}</h2>
      </div>
      <div className={styles.screensPage}>
        {columns.map((column) => (
          <Column
            key={column._id}
            title={column.title}
            tasks={tasks.filter((task) => task.columnId === column._id)}
            boardId={boardId}
          />
        ))}
        <div className={styles.addColumnContainer}>
          {/* Buton pentru adăugarea unei noi coloane */}
          <button className={styles.addColumnButton} onClick={createColumn}>
            <span className={styles.plusSignModal}>+</span>
            Add new column
          </button>
        </div>
      </div>
    </>
  );
}

export default ScreensPage;
