import React, { createContext, useState, useEffect } from "react";
import {
  getBoards,
  createBoard as apiCreateBoard,
  updateBoard as apiUpdateBoard,
  deleteBoard as apiDeleteBoard,
} from "../services/api";

export const BoardContext = createContext();

export const BoardProvider = ({ children }) => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // boards la montare
  useEffect(() => {
    const fetchBoards = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await getBoards(token);
        setBoards(res.data);
      } catch (err) {
        console.error("Error fetching boards:", err);
        setError("Could not fetch boards");
      } finally {
        setLoading(false);
      }
    };

    // Așteptăm puțin să fie token-ul salvat
    setTimeout(fetchBoards, 500);
  }, []);

  // pentru board nou
  const createBoard = async (boardName, icon, background) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      //ca sa preia icon-ul si background-ul
      const boardData = {
        name: boardName,
        icon: icon || null,
        background: background || null,
      };

      const response = await apiCreateBoard(token, boardData);
      setBoards((prev) => [...prev, response.data.board]);
    } catch (err) {
      console.error("Error creating board:", err);
      setError("Could not create board");
    }
  };

  // actualizare board (doar numele) acum si icon si background
  const updateBoard = async (boardId, newName, icon, background) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found ^_^");
      }
      //obiect pentru datele board-ului
      const updateData = {
        name: newName,
      };

      //includ icon si background doar daca sunt modificate
      if (icon !== undefined) {
        updateData.icon = icon;
      }

      if (background !== undefined) {
        updateData.background = background;
      }
      const response = await apiUpdateBoard(token, boardId, updateData);
      const updatedBoard = response.data.board;

      setBoards((prevBoards) =>
        prevBoards.map((b) => (b._id === boardId ? updatedBoard : b))
      );
    } catch (err) {
      console.error("Error updating board:", err);
      setError("Could not update board");
    }
  };

  // sterge board
  const deleteBoard = async (boardId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      await apiDeleteBoard(token, boardId);
      setBoards((prev) => prev.filter((b) => b._id !== boardId));
      boardId = null;
    } catch (err) {
      console.error("Error deleting board:", err);
      setError("Could not delete board");
    }
  };

  return (
    <BoardContext.Provider
      value={{ boards, loading, error, createBoard, updateBoard, deleteBoard }}
    >
      {children}
    </BoardContext.Provider>
  );
};
