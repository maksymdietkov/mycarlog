import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getCars, updateCar } from "../api/api";
import "../styles/main.css";

function EditCar() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { carId } = useParams();

  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [vin, setVin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const userId = parseInt(localStorage.getItem("userId"));

  useEffect(() => {
    getCars(userId)
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
      setError(t("fillFields"));
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
      const result = await updateCar(carId, carData);
      if (!result) throw new Error("Failed to update car");
      navigate("/");
    } catch (err) {
      setError(err.message);
      console.error(err);
    }
  };

  if (loading) return <div className="container"><p>{t("loading")}</p></div>;

  return (
    <div className="container" style={{ maxWidth: "400px", margin: "20px auto" }}>
      <button
        onClick={() => window.history.back()}
        style={{ marginBottom: "20px", padding: "8px 16px", borderRadius: "8px", border: "none", backgroundColor: "#fbbf24", color: "#0f172a", cursor: "pointer", fontWeight: "bold" }}
      >
        {t("back")}
      </button>

      <h1>{t("editCar")}</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input type="text" placeholder={t("carName")} value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="text" placeholder={t("brand")} value={brand} onChange={(e) => setBrand(e.target.value)} required />
        <input type="text" placeholder={t("model")} value={model} onChange={(e) => setModel(e.target.value)} required />
        <input type="text" placeholder={t("licensePlate")} value={licensePlate} onChange={(e) => setLicensePlate(e.target.value)} required />
        <input type="text" placeholder={t("vin")} value={vin} onChange={(e) => setVin(e.target.value)} required />

        <button type="submit" style={{ marginTop: "10px", padding: "10px 20px", borderRadius: "8px", border: "none", backgroundColor: "#fbbf24", color: "#0f172a", cursor: "pointer", fontWeight: "bold" }}>
          {t("saveChanges")}
        </button>
      </form>
    </div>
  );
}

export default EditCar;