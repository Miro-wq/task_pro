import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// login
export const loginUser = async (email, password) => {
  return API.post("/auth/login", { email, password });
};

// register
export const registerUser = async (name, email, password) => {
  return API.post("/auth/register", { name, email, password });
};

// get user profile
export const getUserProfile = async (token) => {
  return API.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// board nou
export const createBoard = async (token, boardData) => {
  return API.post("/boards/create", boardData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// get la toate boardurile userului
export const getBoards = async (token) => {
  return API.get("/boards", {
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

// update board
export const updateBoard = async (token, boardId, updateData) => {
  return API.put(`/boards/${boardId}`, updateData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// endpoint taskuri
export const getTasks = (token, columnId) => {
  return API.get(`/columns/${columnId}/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createTask = (token, columnId, taskData) => {
  return API.post(`/columns/${columnId}/tasks`, taskData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateTask = (token, taskId, taskData) => {
  return API.put(`/tasks/${taskId}`, taskData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteTask = (token, taskId) => {
  return API.delete(`/tasks/${taskId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

// endpoint coloane
export const getColumns = (token, boardId) => {
  return API.get(`/boards/${boardId}/columns`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const createColumn = (token, boardId, columnData) => {
  return API.post(`/boards/${boardId}/columns`, columnData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const updateColumn = (token, columnId, columnData) => {
  return API.put(`/columns/${columnId}`, columnData, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const deleteColumn = (token, columnId) => {
  return API.delete(`/columns/${columnId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const moveTask = (token, taskId, newColumnId) => {
  return API.patch(
    `/tasks/${taskId}/move`,
    { columnId: newColumnId },
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};
