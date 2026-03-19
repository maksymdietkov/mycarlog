import React, { useEffect, useState } from "react";
import { getUsers, getCars, getServiceRecords } from "./api/api";

function App() {
  const [users, setUsers] = useState([]);
  const [cars, setCars] = useState([]);
  const [records, setRecords] = useState([]);

  useEffect(() => {
    getUsers().then(setUsers);
    getCars().then(setCars);
    getServiceRecords().then(setRecords);
  }, []);

  return (
    <div>
      <h1>MyCarLog MVP</h1>
      <h2>Users</h2>
      <pre>{JSON.stringify(users, null, 2)}</pre>
      <h2>Cars</h2>
      <pre>{JSON.stringify(cars, null, 2)}</pre>
      <h2>Service Records</h2>
      <pre>{JSON.stringify(records, null, 2)}</pre>
    </div>
  );
}

export default App;