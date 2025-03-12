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

  header {
    background: ${({ theme }) => theme.headerBackground};
    color: ${({ theme }) => theme.text};
    transition: background 0.3s ease-in-out;
  }

  .dropdownMenu {
    background: ${({ theme }) => theme.headerDropdownMenu};
  }

  .modal {
    background: ${({ theme }) => theme.modal};
    color: ${({ theme }) => theme.text};
  }

  .closeButton {
    color: ${({ theme }) => theme.closeButton};
  }

  .closeButton:hover {
    color: ${({ theme }) => theme.closeButtonHover};
    transform: scale(1.1);
  }

  .input {
    background: ${({ theme }) => theme.inputBackground};
    color: ${({ theme }) => theme.inputText};
  }

  .sidebar {
    background: ${({ theme }) => theme.sidebarBackground};
    color: ${({ theme }) => theme.sidebarColor};
  }

  .sideBoards {
    color: ${({ theme }) => theme.sideBoards};
  }

  .helpIcon {
    border: ${({ theme }) => theme.helpIcon};
  }

  .eyeButton {
    color: ${({ theme }) => theme.eyeButton};
  }

  .plusSignModal {
    background: ${({ theme }) => theme.plusSignModal};
    color: ${({ theme }) => theme.textPlusSignModal};
  }

  h2 {
    color: ${({ theme }) => theme.h2};
  }
`;

export const lightTheme = {
  background: "#F6F6F7",
  text: "#161616",
  headerBackground: "#FCFCFC",
  headerDropdownMenu: "#FCFCFC",
  modal: "#FCFCFC",
  inputBackground: "transparent",
  inputText: "#161616",
  closeButton: "#161616",
  closeButtonHover: "#BEDBB0",
  eyeButton: "#161616",
  sidebarBackground: "#FFFFFF",
  sideBoards: "#16161680",
  helpIcon: "1px solid #161616",
  plusSignModal: "#161616",
  textPlusSignModal: "#ffffff",
  h2: "#161616",
};

export const darkTheme = {
  background: "#1F1F1F",
  text: "#ffffff",
  headerBackground: "#161616",
  headerDropdownMenu: "#161616",
  modal: "#1F1F1F",
  inputBackground: "transparent",
  inputText: "#ffffff",
  closeButton: "#ffffff",
  closeButtonHover: "#BEDBB0",
  eyeButton: "#ffffff",
  sidebarBackground: "#121212",
  sideBoards: "#ffffff80",
  helpIcon: "1px solid #ffffff",
  plusSignModal: "#ffffff",
  textPlusSignModal: "#161616",
  h2: "#ffffff",
};

export const violetTheme = {
  background: "#ECEDFD66",
  text: "#161616",
  headerBackground: "#FFFFFF",
  headerDropdownMenu: "#FFFFFF",
  modal: "#ECEDFD",
  inputBackground: "transparent",
  inputText: "#161616",
  closeButton: "#161616",
  closeButtonHover: "#BEDBB0",
  eyeButton: "#161616",
  sidebarBackground: "#5255BC",
  sidebarColor: "FFFFFF",
  sideBoards: "#16161680",
  helpIcon: "1px solid #161616",
  plusSignModal: "#161616",
  textPlusSignModal: "#ffffff",
  h2: "#161616",
};


