import { useState } from "react";
import { useTranslation } from "react-i18next";

function LoginPage({ onLogin }) {
  const { t, i18n } = useTranslation();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const endpoint = isRegister
      ? "http://localhost:8080/api/auth/register"
      : "http://localhost:8080/api/auth/login";

    const body = isRegister ? { name, email, password } : { email, password };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || t("serverError"));
        return;
      }

      localStorage.setItem("userId", data.userId);
      localStorage.setItem("token", data.token);
      onLogin(data.userId);
    } catch (err) {
      setError(t("serverError"));
    } finally {
      setLoading(false);
    }
  };

  const handleLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const inputStyle = {
    padding: "10px 14px",
    borderRadius: "8px",
    border: "1px solid #374151",
    backgroundColor: "#1e293b",
    color: "#fff",
    fontSize: "15px",
    outline: "none",
    width: "100%",
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      backgroundColor: "#0f172a",
      color: "#fff",
      padding: "20px",
    }}>
      {/* Переключатель языка */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
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
      </div>

      <h1 style={{ color: "#fbbf24", marginBottom: "8px", fontSize: "2rem" }}>🚗 CarDash</h1>
      <p style={{ color: "#94a3b8", marginBottom: "32px" }}>
        {isRegister ? t("createAccount") : t("welcomeBack")}
      </p>

      <div style={{
        backgroundColor: "#1e293b",
        borderRadius: "12px",
        padding: "32px",
        width: "100%",
        maxWidth: "380px",
        boxShadow: "0 4px 24px rgba(0,0,0,0.3)",
      }}>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {isRegister && (
            <input type="text" placeholder={t("yourName")} value={name} onChange={(e) => setName(e.target.value)} required style={inputStyle} />
          )}
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />
          <input type="password" placeholder={t("password")} value={password} onChange={(e) => setPassword(e.target.value)} required style={inputStyle} />

          {error && <p style={{ color: "#ef4444", fontSize: "14px", margin: 0 }}>{error}</p>}

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "12px",
              borderRadius: "8px",
              border: "none",
              backgroundColor: "#fbbf24",
              color: "#0f172a",
              fontWeight: "bold",
              fontSize: "15px",
              cursor: loading ? "not-allowed" : "pointer",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "..." : isRegister ? t("createAccount") : t("signIn")}
          </button>
        </form>

        <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "20px 0" }}>
          <div style={{ flex: 1, height: "1px", backgroundColor: "#334155" }} />
          <span style={{ color: "#64748b", fontSize: "13px" }}>{t("or")}</span>
          <div style={{ flex: 1, height: "1px", backgroundColor: "#334155" }} />
        </div>

        <a href="http://localhost:8080/oauth2/authorization/google" style={{ textDecoration: "none" }}>
          <button style={{
            width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #374151",
            backgroundColor: "transparent", color: "#fff", fontWeight: "bold", fontSize: "15px",
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "10px",
          }}>
            <svg width="18" height="18" viewBox="0 0 18 18">
              <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
              <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
              <path fill="#FBBC05" d="M3.964 10.706c-.18-.54-.282-1.117-.282-1.706s.102-1.166.282-1.706V4.962H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.038l3.007-2.332z"/>
              <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.962L3.964 7.294C4.672 5.167 6.656 3.58 9 3.58z"/>
            </svg>
            {t("continueWithGoogle")}
          </button>
        </a>

        <p style={{ textAlign: "center", marginTop: "20px", color: "#64748b", fontSize: "14px" }}>
          {isRegister ? t("alreadyHaveAccount") : t("dontHaveAccount")}{" "}
          <span
            onClick={() => { setIsRegister(!isRegister); setError(""); }}
            style={{ color: "#fbbf24", cursor: "pointer", fontWeight: "bold" }}
          >
            {isRegister ? t("signIn") : t("register")}
          </span>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;