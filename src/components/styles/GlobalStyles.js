import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  body {
    background: ${({ theme }) => theme.background || "#fff"};
    color: ${({ theme }) => theme.text || "#000"};
    font-family: 'Arial', sans-serif;
    margin: 0;
    padding: 0;
    transition: all 0.3s ease-in-out;
  }

  header {
    background: ${({ theme }) => theme.headerBackground || "#161616"};
    color: ${({ theme }) => theme.text || "#000"};
    transition: background 0.3s ease-in-out;
  }

  .username {
    color: ${({ theme }) => theme.headerUsername || "#ffffff"};
  }

  .dropdownMenu {
    background: ${({ theme }) => theme.headerDropdownMenu || "#161616"};
  }

  .modal {
    background: ${({ theme }) => theme.modal || "#161616"};
    color: ${({ theme }) => theme.text || "#161616"};
  }

  .closeButton {
    color: ${({ theme }) => theme.closeButton || "#161616"};
  }

  .closeButton:hover {
    color: ${({ theme }) => theme.closeButtonHover || "#BEDBB0"};
    transform: scale(1.1);
  }

  .input {
    background: ${({ theme }) => theme.inputBackground || "#161616"};
    color: ${({ theme }) => theme.inputText || "#161616"};
    
  }
`;

export const lightTheme = {
  background: "#F6F6F7",
  text: "#161616",
  headerBackground: "#FCFCFC",
  headerUsername: "#161616",
  headerDropdownMenu: "#FCFCFC",
  modal: "#FCFCFC",
  inputBackground: "transparent",
  inputText: "#161616",
  closeButton: "#161616",
  closeButtonHover: "#BEDBB0",
};

export const darkTheme = {
  background: "#1F1F1F",
  text: "#ffffff",
  headerBackground: "#161616",
  headerUsername: "#FFFFFF",
  headerDropdownMenu: "#161616",
  modal: "#1F1F1F",
  inputBackground: "transparent",
  inputText: "#ffffff",
  closeButton: "#ffffff",
  closeButtonHover: "#BEDBB0",
};

export const violetTheme = {
  background: "#ECEDFD66",
  text: "#161616",
  headerBackground: "#FFFFFF",
  headerUsername: "#161616",
  headerDropdownMenu: "#FFFFFF",
  modal: "#ECEDFD",
  inputBackground: "transparent",
  inputText: "#161616",
  closeButton: "#161616",
  closeButtonHover: "#BEDBB0",
};

