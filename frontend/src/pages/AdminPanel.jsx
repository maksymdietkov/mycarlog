import { useEffect, useState } from "react";

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/admin/users`)
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch(() => setError("Failed to load users"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div style={styles.container}><p style={{ color: "#fff" }}>Loading...</p></div>;
  if (error) return <div style={styles.container}><p style={{ color: "#ef4444" }}>{error}</p></div>;

  return (
    <div style={styles.container}>
      <h1 style={{ color: "#fbbf24", marginBottom: "8px" }}>Admin Panel 🛠️</h1>
      <p style={{ color: "#94a3b8", marginBottom: "24px" }}>Total users: {users.length}</p>

      <div style={{ overflowX: "auto" }}>
        <table style={styles.table}>
          <thead>
            <tr>
              {["ID", "Name", "Email", "Provider", "Registered"].map((h) => (
                <th key={h} style={styles.th}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} style={styles.tr}>
                <td style={styles.td}>{user.id}</td>
                <td style={styles.td}>{user.name || "—"}</td>
                <td style={styles.td}>{user.email}</td>
                <td style={styles.td}>
                  <span style={{
                    padding: "2px 8px",
                    borderRadius: "12px",
                    fontSize: "12px",
                    backgroundColor: user.provider === "google" ? "#1d4ed8" : "#374151",
                    color: "#fff",
                  }}>
                    {user.provider || "local"}
                  </span>
                </td>
                <td style={styles.td}>
                  {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "900px",
    margin: "40px auto",
    padding: "24px",
    backgroundColor: "#0f172a",
    minHeight: "100vh",
    color: "#fff",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    backgroundColor: "#1e293b",
    borderRadius: "8px",
    overflow: "hidden",
  },
  th: {
    padding: "12px 16px",
    textAlign: "left",
    backgroundColor: "#1f2937",
    color: "#fbbf24",
    fontWeight: "bold",
    fontSize: "14px",
    borderBottom: "1px solid #374151",
  },
  td: {
    padding: "12px 16px",
    fontSize: "14px",
    color: "#e2e8f0",
    borderBottom: "1px solid #1f2937",
  },
  tr: {
    transition: "background 0.15s",
  },
};

export default AdminPanel;