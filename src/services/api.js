import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api',
});

// login
export const loginUser = async (email, password) => {
  return API.post('/auth/login', { email, password });
};

// register
export const registerUser = async (name, email, password) => {
  return API.post('/auth/register', { name, email, password });
};

// get user profile
export const getUserProfile = async (token) => {
  return API.get('/auth/me', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// board nou
export const createBoard = async (token, boardName) => {
  return API.post(
    '/boards/create',
    { name: boardName },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

// get la toate boardurile userului
export const getBoards = async (token) => {
  return API.get('/boards', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// sterge board
export const deleteBoard = async (token, boardId) => {
  return API.delete(`/boards/${boardId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
