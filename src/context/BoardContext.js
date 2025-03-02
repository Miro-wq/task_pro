import React, { createContext, useState, useEffect } from 'react';
import { getBoards, createBoard as apiCreateBoard, updateBoard as apiUpdateBoard, deleteBoard as apiDeleteBoard } from '../services/api';

export const BoardContext = createContext();

export const BoardProvider = ({ children }) => {
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // boards la montare
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    getBoards(token)
      .then((res) => {
        setBoards(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching boards:', err);
        setError('Could not fetch boards');
        setLoading(false);
      });
  }, []);

  // pentru board nou
  const createBoard = async (boardName) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      const response = await apiCreateBoard(token, boardName);
      setBoards((prev) => [...prev, response.data.board]);
    } catch (err) {
      console.error('Error creating board:', err);
      setError('Could not create board');
    }
  };

  // actualizare board (doar numele)
  const updateBoard = async (boardId, newName) => {
    try {
      const token = localStorage.getItem('token');
      const response = await apiUpdateBoard(token, boardId, newName);
      const updatedBoard = response.data.board;

      setBoards((prevBoards) =>
        prevBoards.map((b) => (b._id === boardId ? updatedBoard : b))
      );
    } catch (err) {
      console.error('Error updating board:', err);
    }
  };

  // sterge board
  const deleteBoard = async (boardId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      await apiDeleteBoard(token, boardId);
      setBoards((prev) => prev.filter((b) => b._id !== boardId));
    } catch (err) {
      console.error('Error deleting board:', err);
      setError('Could not delete board');
    }
  };

  return (

    <BoardContext.Provider value={{ boards, loading, error, createBoard, updateBoard, deleteBoard }}>
      {children}
    </BoardContext.Provider>
  );
};