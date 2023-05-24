import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const response = await axios.get(
        "https://jealous-gray-snaps.cyclic.app/checkLoginStatus"
      );
      setIsLoggedIn(response.data.isLoggedIn);
      setUser(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await axios.post("https://jealous-gray-snaps.cyclic.app/login", {
        email,
        password,
      });
      setIsLoggedIn(true);
      setUser(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await axios.post("https://jealous-gray-snaps.cyclic.app/logout");
      setIsLoggedIn(false);
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  const register = async (email, password, name) => {
    try {
      await axios.post("https://jealous-gray-snaps.cyclic.app/register", {
        email,
        password,
        name,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
