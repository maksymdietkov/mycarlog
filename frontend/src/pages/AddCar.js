import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { addCar } from "../api/api";

function AddCar({ userId }) {
  const { t } = useTranslation();
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
      setError(t("fillFields"));
      return;
    }

    const carData = { name, brand, model, licensePlate, vin, user: { id: userId } };

    try {
      const result = await addCar(carData);
      if (!result) throw new Error("Failed to add car");
      setName(""); setBrand(""); setModel(""); setLicensePlate(""); setVin(""); setError("");
      navigate("/");
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #374151",
    backgroundColor: "#111827",
    color: "#fff",
  };

  return (
    <div style={{ maxWidth: "500px", margin: "20px auto", padding: "20px", borderRadius: "8px", backgroundColor: "#111827", color: "#fff" }}>
      <button
        onClick={() => window.history.back()}
        style={{ marginBottom: "20px", padding: "8px 16px", borderRadius: "8px", border: "none", backgroundColor: "#fbbf24", color: "#0f172a", cursor: "pointer", fontWeight: "bold" }}
      >
        {t("back")}
      </button>

      <h1 style={{ color: "#fbbf24" }}>{t("addNewCar")}</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input type="text" placeholder={t("carName")} value={name} onChange={(e) => setName(e.target.value)} required style={inputStyle} />
        <input type="text" placeholder={t("brand")} value={brand} onChange={(e) => setBrand(e.target.value)} required style={inputStyle} />
        <input type="text" placeholder={t("model")} value={model} onChange={(e) => setModel(e.target.value)} required style={inputStyle} />
        <input type="text" placeholder={t("licensePlate")} value={licensePlate} onChange={(e) => setLicensePlate(e.target.value)} required style={inputStyle} />
        <input type="text" placeholder={t("vin")} value={vin} onChange={(e) => setVin(e.target.value)} required style={inputStyle} />

        <button type="submit" style={{ marginTop: "10px", padding: "10px 20px", borderRadius: "8px", border: "none", backgroundColor: "#fbbf24", color: "#0f172a", cursor: "pointer", fontWeight: "bold" }}>
          {t("addCar")}
        </button>
      </form>
    </div>
  );
}

export default AddCar;