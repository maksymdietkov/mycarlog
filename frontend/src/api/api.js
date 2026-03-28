// Базовый URL для вашего backend
const BASE_URL = process.env.REACT_APP_API_URL + "/api";

export async function getCars(userId) {
  try {
    const res = await fetch(`${BASE_URL}/cars?userId=${userId}`);
    if (!res.ok) throw new Error(`Failed to fetch cars: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error in getCars:", err);
    return [];
  }
}

export async function getServiceRecords(carId) {
  try {
    const res = await fetch(`${BASE_URL}/records?carId=${carId}`);
    if (!res.ok) throw new Error(`Failed to fetch service records: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error in getServiceRecords:", err);
    return [];
  }
}

export async function addCar(carData) {
  try {
    const res = await fetch(`${BASE_URL}/cars`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(carData),
    });
    if (!res.ok) throw new Error(`Failed to add car: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error in addCar:", err);
    return null;
  }
}

export async function addServiceRecord(recordData) {
  try {
    const res = await fetch(`${BASE_URL}/records`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recordData),
    });
    if (!res.ok) throw new Error(`Failed to add service record: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error in addServiceRecord:", err);
    return null;
  }
}

export async function deleteCar(id) {
  try {
    const res = await fetch(`${BASE_URL}/cars/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error(`Failed to delete car: ${res.status}`);
    return true;
  } catch (err) {
    console.error("Error in deleteCar:", err);
    return false;
  }
}

export async function deleteRecord(id) {
  try {
    const res = await fetch(`${BASE_URL}/records/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error(`Failed to delete record: ${res.status}`);
    return true;
  } catch (err) {
    console.error("Error in deleteRecord:", err);
    return false;
  }
}

export async function updateCar(id, carData) {
  try {
    const res = await fetch(`${BASE_URL}/cars/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(carData),
    });
    if (!res.ok) throw new Error(`Failed to update car: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error in updateCar:", err);
    return null;
  }
}

export async function updateRecord(id, recordData) {
  try {
    const res = await fetch(`${BASE_URL}/records/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recordData),
    });
    if (!res.ok) throw new Error(`Failed to update record: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error("Error in updateRecord:", err);
    return null;
  }
}