import React from "react";
import { Nav } from "../components";

interface LayoutProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  darkMode,
  toggleDarkMode,
}) => {
  return (
    <>
      <Nav toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      {children}
    </>
  );
};
