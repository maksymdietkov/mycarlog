import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getServiceRecords, getCars, deleteRecord, updateRecord } from "../api/api";
import AddServiceRecord from "./AddServiceRecord";
import "../styles/main.css";

function CarDetails() {
  const { carId } = useParams();
  const [car, setCar] = useState(null);
  const [records, setRecords] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingRecord, setEditingRecord] = useState(null); // запись которую редактируем

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

  const handleDeleteRecord = async (recId) => {
    if (window.confirm("Delete this service record?")) {
      const success = await deleteRecord(recId);
      if (success) {
        setRecords((prev) => prev.filter((r) => r.id !== recId));
      } else {
        alert("Failed to delete record");
      }
    }
  };

  const handleUpdateRecord = async (recId, updatedData) => {
    const result = await updateRecord(recId, updatedData);
    if (result) {
      setRecords((prev) => prev.map((r) => (r.id === recId ? result : r)));
      setEditingRecord(null);
    } else {
      alert("Failed to update record");
    }
  };

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
            {editingRecord?.id === rec.id ? (
              // Форма редактирования
              <EditRecordForm
                record={editingRecord}
                onSave={(data) => handleUpdateRecord(rec.id, data)}
                onCancel={() => setEditingRecord(null)}
              />
            ) : (
              <>
                <p><strong>Date:</strong> {rec.date}</p>
                <p><strong>Mileage:</strong> {rec.mileage} km</p>
                <p><strong>Cost:</strong> ${rec.cost}</p>
                <p><strong>Service:</strong> {rec.description}</p>
                <p><strong>Station:</strong> {rec.serviceStation}</p>
                {rec.notes && <p><strong>Notes:</strong> {rec.notes}</p>}

                <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
                  <button
                    onClick={() => setEditingRecord(rec)}
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
                    onClick={() => handleDeleteRecord(rec.id)}
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
              </>
            )}
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

// Встроенная форма редактирования записи
function EditRecordForm({ record, onSave, onCancel }) {
  const [date, setDate] = useState(record.date);
  const [mileage, setMileage] = useState(record.mileage);
  const [cost, setCost] = useState(record.cost);
  const [description, setDescription] = useState(record.description);
  const [serviceStation, setServiceStation] = useState(record.serviceStation);
  const [notes, setNotes] = useState(record.notes || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ date, mileage: parseInt(mileage), cost: parseFloat(cost), description, serviceStation, notes });
  };

  const inputStyle = {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #374151",
    backgroundColor: "#111827",
    color: "#fff",
    width: "100%",
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required style={inputStyle} />
      <input type="number" placeholder="Mileage" value={mileage} onChange={(e) => setMileage(e.target.value)} required style={inputStyle} />
      <input type="number" step="0.01" placeholder="Cost" value={cost} onChange={(e) => setCost(e.target.value)} required style={inputStyle} />
      <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required style={{ ...inputStyle, minHeight: "60px", resize: "vertical" }} />
      <input type="text" placeholder="Service Station" value={serviceStation} onChange={(e) => setServiceStation(e.target.value)} required style={inputStyle} />
      <input type="text" placeholder="Notes" value={notes} onChange={(e) => setNotes(e.target.value)} style={inputStyle} />

      <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
        <button type="submit" style={{ padding: "6px 12px", borderRadius: "6px", border: "none", backgroundColor: "#fbbf24", color: "#0f172a", cursor: "pointer", fontWeight: "bold" }}>
          Save
        </button>
        <button type="button" onClick={onCancel} style={{ padding: "6px 12px", borderRadius: "6px", border: "none", backgroundColor: "#6b7280", color: "#fff", cursor: "pointer" }}>
          Cancel
        </button>
      </div>
    </form>
  );
}

export default CarDetails;