import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getServiceRecords, getCars } from "../api/api";
import "../styles/main.css";

function CarDetails() {
  const { carId } = useParams(); // получаем id машины из URL
  const [car, setCar] = useState(null);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    // Сначала получаем все машины пользователя и фильтруем нужную
    getCars(1)
      .then((cars) => {
        const foundCar = cars.find((c) => c.id === parseInt(carId));
        setCar(foundCar);
      })
      .catch((err) => console.error("Error fetching car:", err));

    // Получаем сервисные записи для этой машины
    getServiceRecords(carId)
      .then(setRecords)
      .catch((err) => console.error("Error fetching service records:", err));
  }, [carId]);

  if (!car) {
    return (
      <div className="container">
        <p>Loading car details...</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1>{car.name} 🚗</h1>
      <p>
        {car.brand} {car.model} | License: {car.licensePlate}
      </p>

      <h2>Service History</h2>
      {records.length === 0 ? (
        <p className="no-cars">No service records yet</p>
      ) : (
        records.map((rec) => (
          <div key={rec.id} className="car-card">
            <p>
              <strong>Date:</strong> {rec.date}
            </p>
            <p>
              <strong>Mileage:</strong> {rec.mileage} km
            </p>
            <p>
              <strong>Cost:</strong> ${rec.cost}
            </p>
            <p>
              <strong>Service:</strong> {rec.description}
            </p>
            <p>
              <strong>Station:</strong> {rec.serviceStation}
            </p>
            {rec.notes && <p><strong>Notes:</strong> {rec.notes}</p>}
          </div>
        ))
      )}

      <button
        className="add-car-btn"
        style={{ marginTop: "20px" }}
        onClick={() => alert("Add Record form coming soon!")}
      >
        + Add Record
      </button>
    </div>
  );
}

export default CarDetails;