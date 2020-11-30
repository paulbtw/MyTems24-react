import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";
import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AuthContextProvider from "./context/auth.context";
import UserContextProvider from "./context/user.context";
import { Routes } from "./Routes";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const theme = createMuiTheme({
    palette: {
      type: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <AuthContextProvider>
        <UserContextProvider>
          <CssBaseline />
          <Router>
            <Routes toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
          </Router>
        </UserContextProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;
