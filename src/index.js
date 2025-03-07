import React from "react";
import ReactDOM from "react-dom/client";
import { GlobalStyles } from "./components/styles/GlobalStyles";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UserProvider } from "./context/UserContext";
import { BoardProvider } from "./context/BoardContext";
import { ThemeProviderWrapper } from "./context/ThemeContext/ThemeContext.jsx";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProviderWrapper>
    <UserProvider>
      <BoardProvider>
        <ThemeProviderWrapper>
          <GlobalStyles />
          <App />
        </ThemeProviderWrapper>
      </BoardProvider>
    </UserProvider>
  </ThemeProviderWrapper>
);

reportWebVitals();

