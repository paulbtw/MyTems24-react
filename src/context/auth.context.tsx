import React, { useState, useEffect, ReactNode, createContext } from "react";
import { useLocation } from "react-router-dom";
import { requestApi } from "../utils";

export const AuthContext = createContext({
  isAuth: false,
  handleLoginClick: (returnTo: string) => {},
  handleLogoutClick: (returnTo: string) => {},
});

interface AuthContextProps {}

const AuthContextProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    requestApi("/auth/login/success")
      .then((response) => {
        if (response.status === 200) {
          return setIsAuthenticated(true);
        }
        return setIsAuthenticated(false);
      })
      .catch((err) => {
        setIsAuthenticated(false);
        console.log(err);
      });
  }, []);

  const handleLoginClick = (returnTo: string) => {
    window.open(`http://localhost:5000/auth/steam?r=${returnTo}`, "_self");
  };

  const handleLogoutClick = (returnTo: string) => {
    window.open(`http://localhost:5000/auth/logout?r=${returnTo}`, "_self");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuth: isAuthenticated,
        handleLoginClick: handleLoginClick,
        handleLogoutClick: handleLogoutClick,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
