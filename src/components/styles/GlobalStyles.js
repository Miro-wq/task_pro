import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.background || "#fff"};
    color: ${({ theme }) => theme.text || "#000"};
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    transition: all 0.3s ease-in-out;
  };

   header {
    background: ${({ theme }) => theme.headerBackground || "#161616"};
    color: ${({ theme }) => theme.text || "#000"};
    transition: background 0.3s ease-in-out;
  }
h1, h2, h3, p, span, div {
    color: ${({ theme }) => theme.text || "#000"};
  }
`;

export const lightTheme = {
  background: "#F6F6F7",
  text: "#000000",
};

export const darkTheme = {
  background: "#1F1F1F",
  text: "#ffffff",
  headerBackground: "#161616",  // Culoare pentru header
  
};

export const violetTheme = {
  background: "#B8BCFD",
  text: "#ffffff",
};
