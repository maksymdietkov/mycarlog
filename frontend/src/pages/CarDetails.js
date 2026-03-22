import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getServiceRecords, getCars } from "../api/api";
import AddServiceRecord from "./AddServiceRecord";
import "../styles/main.css";

function CarDetails() {
  const { carId } = useParams();
  const [car, setCar] = useState(null);
  const [records, setRecords] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  console.log("render | showForm:", showForm, "| loading:", loading, "| car:", car?.id);

  const fetchCarData = () => {
    setLoading(true);
    Promise.all([getCars(1), getServiceRecords(carId)])
      .then(([cars, recs]) => {
        const foundCar = cars.find((c) => c.id === parseInt(carId));
        setCar(foundCar);
        setRecords(recs);
      })
      .catch((err) => console.error("Error fetching car data:", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchCarData();
  }, [carId]);

  if (loading) return <div className="container"><p>Loading car details...</p></div>;
  if (!car) return <div className="container"><p>Car not found.</p></div>;

  return (
    <div className="container">
      <button
        onClick={() => window.history.back()}
        style={{
          marginBottom: "20px",
          padding: "8px 16px",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#fbbf24",
          color: "#0f172a",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        ← Back
      </button>

      <h1 style={{ color: "#fbbf24" }}>{car.name} 🚗</h1>
      <p style={{ color: "#fff" }}>
        {car.brand} {car.model} | License: {car.licensePlate}
      </p>

      <h2 style={{ color: "#fbbf24" }}>Service History</h2>

      {records.length === 0 ? (
        <p className="no-cars">No service records yet</p>
      ) : (
        records.map((rec) => (
          <div
            key={rec.id}
            className="car-card"
            style={{
              backgroundColor: "#1f2937",
              color: "#fff",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "6px",
            }}
          >
            <p><strong>Date:</strong> {rec.date}</p>
            <p><strong>Mileage:</strong> {rec.mileage} km</p>
            <p><strong>Cost:</strong> ${rec.cost}</p>
            <p><strong>Service:</strong> {rec.description}</p>
            <p><strong>Station:</strong> {rec.serviceStation}</p>
            {rec.notes && <p><strong>Notes:</strong> {rec.notes}</p>}
          </div>
        ))
      )}

      {!showForm && (
        <button
          className="add-car-btn"
          style={{
            marginTop: "20px",
            padding: "12px 24px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#fbbf24",
            color: "#0f172a",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "16px",
          }}
          onClick={() => setShowForm(true)}
        >
          + Add Record
        </button>
      )}

      {showForm && (
        <AddServiceRecord
          carId={car.id}
          onRecordAdded={(newRec) => {
            setRecords([...records, newRec]);
            setShowForm(false);
          }}
        />
      )}
    </div>
  );
}

export default CarDetails;
