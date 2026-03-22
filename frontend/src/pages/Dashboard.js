import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCars, deleteCar } from "../api/api";
import "../styles/main.css";

function Dashboard() {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();
  const userId = 1;

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
              backgroundColor: "#1f2937",
              color: "#fff",
              cursor: "pointer",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
            }}
          >
            <h3 style={{ color: "#fbbf24" }}>{car.name}</h3>
            <p>{car.brand} {car.model}</p>
            <p>License: {car.licensePlate}</p>

            <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/edit-car/${car.id}`);
                }}
                style={{
                  padding: "6px 12px",
                  borderRadius: "6px",
                  border: "none",
                  backgroundColor: "#3b82f6",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>

              <button
                type="button"
                onClick={async (e) => {
                  e.stopPropagation();
                  if (window.confirm("Delete this car?")) {
                    const success = await deleteCar(car.id);
                    if (success) {
                      setCars((prev) => prev.filter((c) => c.id !== car.id));
                    } else {
                      alert("Failed to delete car");
                    }
                  }
                }}
                style={{
                  padding: "6px 12px",
                  borderRadius: "6px",
                  border: "none",
                  backgroundColor: "#ef4444",
                  color: "#fff",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}

      <button
        type="button"
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