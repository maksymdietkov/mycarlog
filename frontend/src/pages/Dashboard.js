import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCars } from "../api/api";
import "../styles/main.css";

function Dashboard() {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();
  const userId = 1; // пока статично

  const fetchCars = () => {
    getCars(userId)
      .then((data) => setCars(data))
      .catch((err) => console.error("Error fetching cars:", err));
  };

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <div className="container">
      <h1>My Cars 🚗</h1>

      {cars.length === 0 ? (
        <p className="no-cars">No cars yet</p>
      ) : (
        cars.map((car) => (
          <div
            key={car.id}
            className="car-card"
            onClick={() => navigate(`/car/${car.id}`)}
            style={{
              padding: "12px",
              marginBottom: "12px",
              borderRadius: "8px",
              backgroundColor: "#1f2937", // современный графитовый
              color: "#fff", // белый текст
              cursor: "pointer",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            }}
          >
            <h3>{car.name}</h3>
            <p>
              {car.brand} {car.model}
            </p>
            <p>License: {car.licensePlate}</p>
          </div>
        ))
      )}

      <button
        className="add-car-btn"
        onClick={() => navigate("/add-car")}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#fbbf24",
          color: "#0f172a",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        + Add Car
      </button>
    </div>
  );
}

export default Dashboard;