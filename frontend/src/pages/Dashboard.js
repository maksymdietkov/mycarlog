import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCars } from "../api/api";
import "../styles/main.css";

function Dashboard() {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Получаем машины пользователя с id=1 (можно заменить на реальный userId)
    getCars(1)
      .then((data) => setCars(data))
      .catch((err) => console.error("Error fetching cars:", err));
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
          >
            <h3>{car.name}</h3>
            <p>
              {car.brand} {car.model}
            </p>
            <p>License: {car.licensePlate}</p>
          </div>
        ))
      )}

      {/* Кнопка добавить авто */}
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