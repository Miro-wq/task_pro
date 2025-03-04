import React, { useState, useEffect, useContext } from 'react';
// import { useParams } from 'react-router-dom';
import Column from '../Column/Column';
import styles from './ScreensPage.module.css';
import { getTasks } from '../../services/api';
import { BoardContext } from '../../context/BoardContext';

function ScreensPage({ boardId }) {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { boards } = useContext(BoardContext);

    useEffect(() => {
        if (!boardId) {
            return;
        }

        async function fetchTasks() {
            try {
                setLoading(true);
                setError('');
                const token = localStorage.getItem('token');
                const response = await getTasks(token, boardId);
                setTasks(response.data);
            } catch (err) {
                console.error(err);
                setError('Could not fetch tasks');
            } finally {
                setLoading(false);
            }
        }

        fetchTasks();
    }, [boardId]);

    if (!boardId) {
        return <div className={styles.noBoardSelected}>
            <p className={styles.description}>Before starting your project, it is essential <span className={styles.green}>to create a board</span> to visualize and track all the necessary tasks and milestones. This board serves as a powerful tool to organize the workflow and ensure effective collaboration among team members.</p>
        </div>;
    }

    if (loading) return <div>Loading tasks...</div>;
    if (error) return <div>{error}</div>;

    const currentBoard = boards.find((b) => b._id === boardId);

    if (!currentBoard) {
        return <p>Board not found</p>;
    }

    // tasks pe categorii, dar mai trebuie putin modificat
    const tasksToDo = tasks.filter((t) => t.status === 'todo');
    const tasksInProgress = tasks.filter((t) => t.status === 'inprogress');
    const tasksDone = tasks.filter((t) => t.status === 'done');

    return (
        <>
            <div className={styles.nameBoard}>
                <h2 className={styles.screensTitle}>{currentBoard.name}</h2>

            </div>
            <div className={styles.screensPage}>
                <Column title="To Do" tasks={tasksToDo} status="todo" boardId={boardId} />
                <Column title="In Progress" tasks={tasksInProgress} status="inprogress" boardId={boardId} />
                <Column title="Done" tasks={tasksDone} status="done" boardId={boardId} />
            </div>
        </>
    );
}

export default ScreensPage;
