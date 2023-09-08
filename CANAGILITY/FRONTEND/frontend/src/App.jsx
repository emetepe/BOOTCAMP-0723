import "./App.css";

import { Header } from "./components/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";

import { useState } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "./theme";

const App = () => {
  // Implementación del dark-mode
  const [theme, setTheme] = useState("dark");
  const isDarkTheme = theme === "dark";
  const toggleTheme = () => setTheme(isDarkTheme ? "light" : "dark");

  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <>
        <GlobalStyles />
        <button onClick={toggleTheme}>
          {isDarkTheme ? (
            <span aria-label="Light mode" role="img">🌞 </span>
          ) : (
            <span aria-label="Dark mode" role="img">🌜</span>
          )}
        </button>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </>
    </ThemeProvider>
  );
};

export default App;
