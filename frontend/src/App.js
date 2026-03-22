import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import CarDetails from "./pages/CarDetails";
import AddCar from "./pages/AddCar";
import EditCar from "./pages/EditCar";

function App() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // Читаем userId из URL параметра после редиректа с бэка
    const params = new URLSearchParams(window.location.search);
    const id = params.get("userId");

    if (id) {
      localStorage.setItem("userId", id);
      setUserId(parseInt(id));
      // Убираем параметр из URL
      window.history.replaceState({}, "", "/");
    } else {
      // Если уже был залогинен раньше
      const saved = localStorage.getItem("userId");
      if (saved) setUserId(parseInt(saved));
    }
  }, []);

  // Если userId нет — редиректим на логин через бэк
  if (!userId) {
    return (
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#0f172a",
        color: "#fff",
      }}>
        <h1 style={{ color: "#fbbf24", marginBottom: "20px" }}>🚗 MyCarLog</h1>
        <a href="http://localhost:8080/oauth2/authorization/google">
          <button style={{
            padding: "12px 24px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#fbbf24",
            color: "#0f172a",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px",
          }}>
            Sign in with Google
          </button>
        </a>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard userId={userId} />} />
        <Route path="/car/:carId" element={<CarDetails />} />
        <Route path="/add-car" element={<AddCar userId={userId} />} />
        <Route path="/edit-car/:carId" element={<EditCar />} />
        <Route path="*" element={
          <div style={{ color: "#fff", textAlign: "center", marginTop: "50px" }}>
            <h2>404 — Page Not Found</h2>
          </div>
        } />
      </Routes>
    </Router>
  );
}

export default App;