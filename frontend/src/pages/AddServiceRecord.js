import { useState } from "react";
import { useTranslation } from "react-i18next";

function AddServiceRecord({ carId, onRecordAdded }) {
  const { t } = useTranslation();
  const [date, setDate] = useState("");
  const [mileage, setMileage] = useState("");
  const [mileageUnit, setMileageUnit] = useState("km");
  const [cost, setCost] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [description, setDescription] = useState("");
  const [serviceStation, setServiceStation] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const currencies = ["USD", "EUR", "GBP", "CZK", "RUB", "PLN", "UAH"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || !mileage || !cost || !description || !serviceStation) {
      setError(t("fillFields"));
      return;
    }

    const payload = {
      car: { id: carId },
      date,
      mileage: parseInt(mileage),
      mileageUnit,
      cost: parseFloat(cost),
      currency,
      description,
      serviceStation,
      notes,
    };

    try {
      const res = await fetch("http://localhost:8080/api/records", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to add record");

      const newRecord = await res.json();
      onRecordAdded(newRecord);

      setDate("");
      setMileage("");
      setMileageUnit("km");
      setCost("");
      setCurrency("USD");
      setDescription("");
      setServiceStation("");
      setNotes("");
      setError("");
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  const inputStyle = {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #374151",
    backgroundColor: "#111827",
    color: "#fff",
  };

  return (
    <div style={{ maxWidth: "500px", margin: "20px auto", padding: "20px", borderRadius: "8px", backgroundColor: "#111827", color: "#fff" }}>
      <h2 style={{ color: "#fbbf24" }}>{t("addServiceRecord")}</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required style={inputStyle} />

        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <input type="number" placeholder={t("mileage")} value={mileage} onChange={(e) => setMileage(e.target.value)} required style={{ ...inputStyle, flex: 1 }} />
          <label style={{ display: "flex", alignItems: "center", gap: "4px", cursor: "pointer" }}>
            <input type="radio" value="km" checked={mileageUnit === "km"} onChange={() => setMileageUnit("km")} /> km
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "4px", cursor: "pointer" }}>
            <input type="radio" value="mi" checked={mileageUnit === "mi"} onChange={() => setMileageUnit("mi")} /> mi
          </label>
        </div>

        <div style={{ display: "flex", gap: "8px" }}>
          <input type="number" step="0.01" placeholder={t("cost")} value={cost} onChange={(e) => setCost(e.target.value)} required style={{ ...inputStyle, flex: 1 }} />
          <select value={currency} onChange={(e) => setCurrency(e.target.value)} style={{ ...inputStyle, width: "90px" }}>
            {currencies.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <textarea placeholder={t("description")} value={description} onChange={(e) => setDescription(e.target.value)} required style={{ ...inputStyle, minHeight: "80px", resize: "vertical", width: "100%" }} />
        <input type="text" placeholder={t("serviceStation")} value={serviceStation} onChange={(e) => setServiceStation(e.target.value)} required style={inputStyle} />
        <input type="text" placeholder={t("notes")} value={notes} onChange={(e) => setNotes(e.target.value)} style={inputStyle} />

        <button type="submit" style={{ marginTop: "10px", padding: "10px 20px", borderRadius: "8px", border: "none", backgroundColor: "#fbbf24", color: "#0f172a", cursor: "pointer", fontWeight: "bold" }}>
          {t("addRecord")}
        </button>
      </form>
    </div>
  );
}

export default AddServiceRecord;