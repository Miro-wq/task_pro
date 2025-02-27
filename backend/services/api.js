import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:PORT', // trebuie actualizat cu portul corect (probabil 5000)
});

// Autentificare
export const loginUser = (data) => API.post('/login', data);
export const registerUser = (data) => API.post('/register', data);

// Dashboard-uri și task-uri
export const getDashboard = (boardName) => API.get(`/dashboard/${boardName}`);
export const createTask = (boardName, taskData) => API.post(`/dashboard/${boardName}/task`, taskData);
export const updateTask = (boardName, taskId, taskData) => API.put(`/dashboard/${boardName}/task/${taskId}`, taskData);

export default API;
