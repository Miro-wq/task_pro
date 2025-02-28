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
