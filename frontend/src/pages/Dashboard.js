import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getCars, deleteCar } from "../api/api";
import "../styles/main.css";

function Dashboard({ userId }) {
  const { t, i18n } = useTranslation();
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  const fetchCars = () => {
    getCars(userId)
      .then((data) => setCars(data))
      .catch((err) => console.error("Error fetching cars:", err));
  };

  useEffect(() => {
    fetchCars();
  }, [userId]);

  const handleSignOut = () => {
    localStorage.removeItem("userId");
    window.location.href = "/";
  };

  const handleLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  };

  return (
    <div className="container">
      {/* Шапка */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <h1 style={{ margin: 0 }}>{t("myCars")}</h1>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          {["en", "ru", "uk", "de", "pl", "cs"].map((lang) => (
            <button
              key={lang}
              onClick={() => handleLanguage(lang)}
              style={{
                padding: "4px 10px",
                borderRadius: "6px",
                border: "1px solid #374151",
                backgroundColor: i18n.language === lang ? "#fbbf24" : "transparent",
                color: i18n.language === lang ? "#0f172a" : "#94a3b8",
                cursor: "pointer",
                fontSize: "13px",
                fontWeight: i18n.language === lang ? "bold" : "normal",
              }}
            >
              {lang.toUpperCase()}
            </button>
          ))}
          <button
            onClick={handleSignOut}
            style={{ padding: "8px 16px", borderRadius: "8px", border: "1px solid #374151", backgroundColor: "transparent", color: "#94a3b8", cursor: "pointer", fontSize: "14px" }}
          >
            {t("signOut")}
          </button>
        </div>
      </div>

      {cars.length === 0 ? (
        <p className="no-cars">{t("noCars")}</p>
      ) : (
        cars.map((car) => (
          <div
            key={car.id}
            className="car-card"
            onClick={() => navigate(`/car/${car.id}`)}
            style={{ padding: "12px", marginBottom: "12px", borderRadius: "8px", backgroundColor: "#1f2937", color: "#fff", cursor: "pointer", boxShadow: "0 2px 6px rgba(0,0,0,0.15)" }}
          >
            <h3 style={{ color: "#fbbf24" }}>{car.name}</h3>
            <p>{car.brand} {car.model}</p>
            <p>{t("licensePlate")}: {car.licensePlate}</p>

            <div style={{ display: "flex", gap: "8px", marginTop: "10px" }}>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); navigate(`/edit-car/${car.id}`); }}
                style={{ padding: "6px 12px", borderRadius: "6px", border: "none", backgroundColor: "#3b82f6", color: "#fff", cursor: "pointer" }}
              >
                {t("edit")}
              </button>
              <button
                type="button"
                onClick={async (e) => {
                  e.stopPropagation();
                  if (window.confirm("Delete this car?")) {
                    const success = await deleteCar(car.id);
                    if (success) {
                      setCars((prev) => prev.filter((c) => c.id !== car.id));
                    } else {
                      alert("Failed to delete car");
                    }
                  }
                }}
                style={{ padding: "6px 12px", borderRadius: "6px", border: "none", backgroundColor: "#ef4444", color: "#fff", cursor: "pointer" }}
              >
                {t("delete")}
              </button>
            </div>
          </div>
        ))
      )}

      <button
        type="button"
        className="add-car-btn"
        onClick={() => navigate("/add-car")}
        style={{ marginTop: "20px", padding: "10px 20px", borderRadius: "8px", border: "none", backgroundColor: "#fbbf24", color: "#0f172a", cursor: "pointer", fontWeight: "bold" }}
      >
        {t("addCar")}
      </button>
    </div>
  );
}

export default Dashboard;