import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
// views
import Login from "../views/login";
import Home from "../views/home";
// routes
import PrivateRoute from "../components/PrivateRoute";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}
