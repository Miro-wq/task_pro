import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    transition: all 0.3s ease-in-out;
  }
`;

export const lightTheme = {
  background: "linear-gradient(to right, #EAEAEA, #DBDBDB, #F2F2F2, #ADA996)",
  text: "#000000",
};

export const darkTheme = {
  background: "linear-gradient(to right, #434343, #000000)",
  text: "#ffffff",
};
