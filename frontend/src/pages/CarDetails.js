import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getServiceRecords, getCars, deleteRecord, updateRecord } from "../api/api";
import AddServiceRecord from "./AddServiceRecord";
import "../styles/main.css";

function CarDetails() {
  const { t } = useTranslation();
  const { carId } = useParams();
  const [car, setCar] = useState(null);
  const [records, setRecords] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [editingRecord, setEditingRecord] = useState(null);

  const userId = parseInt(localStorage.getItem("userId"));

  const fetchCarData = () => {
    setLoading(true);
    Promise.all([getCars(userId), getServiceRecords(carId)])
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  if (loading) return <div className="container"><p>{t("loading")}</p></div>;
  if (!car) return <div className="container"><p>{t("carNotFound")}</p></div>;

  return (
    <div className="container">
      <button
        onClick={() => window.history.back()}
        style={{ marginBottom: "20px", padding: "8px 16px", borderRadius: "8px", border: "none", backgroundColor: "#fbbf24", color: "#0f172a", cursor: "pointer", fontWeight: "bold" }}
      >
        {t("back")}
      </button>

      <h1 style={{ color: "#fbbf24" }}>{car.name} 🚗</h1>
      <p style={{ color: "#fff" }}>
        {car.brand} {car.model} | License: {car.licensePlate}
      </p>

      <h2 style={{ color: "#fbbf24" }}>{t("serviceHistory")}</h2>

      {records.length === 0 ? (
        <p className="no-cars">{t("noRecords")}</p>
      ) : (
        records.map((rec) => (
          <div key={rec.id} className="car-card" style={{ backgroundColor: "#1f2937", color: "#fff", padding: "10px", marginBottom: "10px", borderRadius: "6px" }}>
            {editingRecord?.id === rec.id ? (
              <EditRecordForm
                record={editingRecord}
                onSave={(data) => handleUpdateRecord(rec.id, data)}
                onCancel={() => setEditingRecord(null)}
              />
            ) : (
              <>
                <p><strong>{t("date")}:</strong> {rec.date}</p>
                <p><strong>{t("mileage")}:</strong> {rec.mileage} {rec.mileageUnit || "km"}</p>
                <p><strong>{t("cost")}:</strong> {rec.cost} {rec.currency || "USD"}</p>
                <p><strong>{t("service")}:</strong> {rec.description}</p>
                <p><strong>{t("station")}:</strong> {rec.serviceStation}</p>
                {rec.notes && <p><strong>{t("notes")}:</strong> {rec.notes}</p>}

                <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
                  <button onClick={() => setEditingRecord(rec)} style={{ padding: "6px 12px", borderRadius: "6px", border: "none", backgroundColor: "#3b82f6", color: "#fff", cursor: "pointer" }}>
                    {t("edit")}
                  </button>
                  <button onClick={() => handleDeleteRecord(rec.id)} style={{ padding: "6px 12px", borderRadius: "6px", border: "none", backgroundColor: "#ef4444", color: "#fff", cursor: "pointer" }}>
                    {t("delete")}
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
          style={{ marginTop: "20px", padding: "12px 24px", borderRadius: "8px", border: "none", backgroundColor: "#fbbf24", color: "#0f172a", cursor: "pointer", fontWeight: "bold", fontSize: "16px" }}
          onClick={() => setShowForm(true)}
        >
          {t("addRecord")}
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

function EditRecordForm({ record, onSave, onCancel }) {
  const { t } = useTranslation();
  const [date, setDate] = useState(record.date);
  const [mileage, setMileage] = useState(record.mileage);
  const [mileageUnit, setMileageUnit] = useState(record.mileageUnit || "km");
  const [cost, setCost] = useState(record.cost);
  const [currency, setCurrency] = useState(record.currency || "USD");
  const [description, setDescription] = useState(record.description);
  const [serviceStation, setServiceStation] = useState(record.serviceStation);
  const [notes, setNotes] = useState(record.notes || "");

  const currencies = ["USD", "EUR", "GBP", "CZK", "RUB", "PLN", "UAH"];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ date, mileage: parseInt(mileage), mileageUnit, cost: parseFloat(cost), currency, description, serviceStation, notes });
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

      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        <input type="number" placeholder={t("mileage")} value={mileage} onChange={(e) => setMileage(e.target.value)} required style={{ ...inputStyle, width: "auto", flex: 1 }} />
        <label style={{ display: "flex", alignItems: "center", gap: "4px", cursor: "pointer" }}>
          <input type="radio" value="km" checked={mileageUnit === "km"} onChange={() => setMileageUnit("km")} /> km
        </label>
        <label style={{ display: "flex", alignItems: "center", gap: "4px", cursor: "pointer" }}>
          <input type="radio" value="mi" checked={mileageUnit === "mi"} onChange={() => setMileageUnit("mi")} /> mi
        </label>
      </div>

      <div style={{ display: "flex", gap: "8px" }}>
        <input type="number" step="0.01" placeholder={t("cost")} value={cost} onChange={(e) => setCost(e.target.value)} required style={{ ...inputStyle, width: "auto", flex: 1 }} />
        <select value={currency} onChange={(e) => setCurrency(e.target.value)} style={{ ...inputStyle, width: "90px" }}>
          {currencies.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <textarea placeholder={t("description")} value={description} onChange={(e) => setDescription(e.target.value)} required style={{ ...inputStyle, minHeight: "60px", resize: "vertical" }} />
      <input type="text" placeholder={t("serviceStation")} value={serviceStation} onChange={(e) => setServiceStation(e.target.value)} required style={inputStyle} />
      <input type="text" placeholder={t("notes")} value={notes} onChange={(e) => setNotes(e.target.value)} style={inputStyle} />

      <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
        <button type="submit" style={{ padding: "6px 12px", borderRadius: "6px", border: "none", backgroundColor: "#fbbf24", color: "#0f172a", cursor: "pointer", fontWeight: "bold" }}>{t("save")}</button>
        <button type="button" onClick={onCancel} style={{ padding: "6px 12px", borderRadius: "6px", border: "none", backgroundColor: "#6b7280", color: "#fff", cursor: "pointer" }}>{t("cancel")}</button>
      </div>
    </form>
  );
}

export default CarDetails;