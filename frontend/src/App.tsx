import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Dashboard from "./Pages/Dashboard";
import { loadToken } from "./api/api";

function App() {
  useEffect(() => {
    loadToken();
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}

export default App;