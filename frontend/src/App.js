import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CarDetails from "./pages/CarDetails";
import AddCar from "./pages/AddCar";
import EditCar from "./pages/EditCar";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/car/:carId" element={<CarDetails />} />
        <Route path="/add-car" element={<AddCar />} />
        <Route path="/edit-car/:carId" element={<EditCar />} />

        {/* Заглушка для неверного URL */}
        <Route
          path="*"
          element={
            <div style={{ color: "#fff", textAlign: "center", marginTop: "50px" }}>
              <h2>404 — Page Not Found</h2>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;