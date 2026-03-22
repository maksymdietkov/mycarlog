import { useState } from "react";

function AddServiceRecord({ carId, onRecordAdded }) {
  const [date, setDate] = useState("");
  const [mileage, setMileage] = useState("");
  const [cost, setCost] = useState("");
  const [description, setDescription] = useState("");
  const [serviceStation, setServiceStation] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!date || !mileage || !cost || !description || !serviceStation) {
      setError("Please fill in all required fields");
      return;
    }

    const payload = {
      car: { id: carId },
      date,
      mileage: parseInt(mileage),
      cost: parseFloat(cost),
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
      setCost("");
      setDescription("");
      setServiceStation("");
      setNotes("");
      setError("");
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <div
      style={{
        maxWidth: "500px",
        margin: "20px auto",
        padding: "20px",
        borderRadius: "8px",
        backgroundColor: "#111827",
        color: "#fff",
      }}
    >
      <h2 style={{ color: "#fbbf24" }}>Add Service Record 🛠️</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          style={{
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #374151",
            backgroundColor: "#111827",
            color: "#fff",
          }}
        />
        <input
          type="number"
          placeholder="Mileage"
          value={mileage}
          onChange={(e) => setMileage(e.target.value)}
          required
          style={{
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #374151",
            backgroundColor: "#111827",
            color: "#fff",
          }}
        />
        <input
          type="number"
          step="0.01"
          placeholder="Cost"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          required
          style={{
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #374151",
            backgroundColor: "#111827",
            color: "#fff",
          }}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{
            width: "100%",
            minHeight: "80px",
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #374151",
            backgroundColor: "#111827",
            color: "#fff",
            resize: "vertical",
          }}
        />
        <input
          type="text"
          placeholder="Service Station"
          value={serviceStation}
          onChange={(e) => setServiceStation(e.target.value)}
          required
          style={{
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #374151",
            backgroundColor: "#111827",
            color: "#fff",
          }}
        />
        <input
          type="text"
          placeholder="Notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          style={{
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #374151",
            backgroundColor: "#111827",
            color: "#fff",
          }}
        />
        <button
          type="submit"
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            borderRadius: "8px",
            border: "none",
            backgroundColor: "#fbbf24",
            color: "#0f172a",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Add Record
        </button>
      </form>
    </div>
  );
}

export default AddServiceRecord;
