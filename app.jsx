import React, { useState } from "react";
import LoginScreen from "./app/screens/LoginScreen";
import DashboardScreen from "./app/screens/DashboardScreen";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return isAuthenticated ? (
    <DashboardScreen onLogout={() => setIsAuthenticated(false)} />
  ) : (
    <LoginScreen onLoginSuccess={() => setIsAuthenticated(true)} />
  );
}
