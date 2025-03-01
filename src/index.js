import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { UserProvider } from './context/UserContext';
import { BoardProvider } from './context/BoardContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UserProvider>
    <BoardProvider>
    <App />
    </BoardProvider>
  </UserProvider>
);

reportWebVitals();
