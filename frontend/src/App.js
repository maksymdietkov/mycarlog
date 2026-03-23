import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Dashboard from "./pages/Dashboard";
import CarDetails from "./pages/CarDetails";
import AddCar from "./pages/AddCar";
import EditCar from "./pages/EditCar";
import LoginPage from "./pages/LoginPage";

function App() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("userId");

    if (id) {
      localStorage.setItem("userId", id);
      setUserId(parseInt(id));
      window.history.replaceState({}, "", "/");
    } else {
      const saved = localStorage.getItem("userId");
      if (saved) setUserId(parseInt(saved));
    }
  }, []);

  const handleLogin = (id) => {
    setUserId(id);
  };

  if (!userId) {
    return <LoginPage onLogin={handleLogin} />;
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