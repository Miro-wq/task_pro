import React, { createContext, useState, useEffect } from 'react';
import { getBoards, createBoard as apiCreateBoard, deleteBoard as apiDeleteBoard } from '../services/api';

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

  // pentru a crea un board nou
  const createBoard = async (boardName) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      const response = await apiCreateBoard(token, boardName);
      // adauga nou board în lista curentă, fără să mai faca tot request-ul
      setBoards((prev) => [...prev, response.data.board]);
    } catch (err) {
      console.error('Error creating board:', err);
      setError('Could not create board');
    }
  };

  // șterge board
  const deleteBoard = async (boardId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }
      await apiDeleteBoard(token, boardId);
      // elimina boardul din state
      setBoards((prev) => prev.filter((b) => b._id !== boardId));
    } catch (err) {
      console.error('Error deleting board:', err);
      setError('Could not delete board');
    }
  };

  return (
    <BoardContext.Provider value={{ boards, loading, error, createBoard, deleteBoard }}>
      {children}
    </BoardContext.Provider>
  );
};
