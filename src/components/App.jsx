import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthContextProvider from "./helpers/AuthContext";
import Navbar from "./Navbar";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";

const App = () => {
  return (
    <Router>
      <AuthContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </AuthContextProvider>
    </Router>
  );
};

export default App;
