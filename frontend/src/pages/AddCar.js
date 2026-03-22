import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addCar } from "../api/api";
import "../styles/main.css";

function AddCar({ userId }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [vin, setVin] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !brand || !model || !licensePlate || !vin) {
      setError("Please fill in all required fields");
      return;
    }

    const carData = {
      name,
      brand,
      model,
      licensePlate,
      vin,
      user: { id: userId },
    };

    try {
      const result = await addCar(carData);
      if (!result) throw new Error("Failed to add car");

      setName("");
      setBrand("");
      setModel("");
      setLicensePlate("");
      setVin("");
      setError("");
      navigate("/");
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  return (
    <div className="container" style={{ maxWidth: "400px", margin: "20px auto" }}>
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

      <h1>Add New Car 🚗</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input
          type="text"
          placeholder="Car Name (nickname)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Model"
          value={model}
          onChange={(e) => setModel(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="License Plate"
          value={licensePlate}
          onChange={(e) => setLicensePlate(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="VIN"
          value={vin}
          onChange={(e) => setVin(e.target.value)}
          required
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
          Add Car
        </button>
      </form>
    </div>
  );
}

export default AddCar;