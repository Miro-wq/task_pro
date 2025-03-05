import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProviderWrapper } from "../src/context/ThemeContext/ThemeContext";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UserProvider } from "./context/UserContext";
import { BoardProvider } from "./context/BoardContext";
import "./index.css"; // Stiluri generale

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProviderWrapper>
    <UserProvider>
      <BoardProvider>
        <App />
      </BoardProvider>
    </UserProvider>
  </ThemeProviderWrapper>
);

reportWebVitals();
