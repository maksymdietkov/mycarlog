import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCars, updateCar } from "../api/api";
import "../styles/main.css";

function EditCar() {
  const navigate = useNavigate();
  const { carId } = useParams();

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [vin, setVin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCars(1)
      .then((cars) => {
        const car = cars.find((c) => c.id === parseInt(carId));
        if (car) {
          setName(car.name);
          setBrand(car.brand);
          setModel(car.model);
          setLicensePlate(car.licensePlate);
          setVin(car.vin);
        }
      })
      .catch((err) => console.error("Error fetching car:", err))
      .finally(() => setLoading(false));
  }, [carId]);

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
      user: { id: 1 },
    };

    try {
      const result = await updateCar(carId, carData);
      if (!result) throw new Error("Failed to update car");
      navigate("/");
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  if (loading) return <div className="container"><p>Loading...</p></div>;

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

      <h1>Edit Car 🚗</h1>

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
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditCar;