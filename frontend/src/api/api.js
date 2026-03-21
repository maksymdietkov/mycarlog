// Базовый URL для вашего backend
const BASE_URL = "http://localhost:8080/api";

/**
 * Получаем список машин пользователя
 * @param {number} userId
 * @returns {Promise<Array>} массив машин
 */
export async function getCars(userId) {
  try {
    const res = await fetch(`${BASE_URL}/cars?userId=${userId}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch cars: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.error("Error in getCars:", err);
    return []; // возвращаем пустой массив при ошибке
  }
}

/**
 * Получаем список сервисных записей для конкретной машины
 * @param {number} carId
 * @returns {Promise<Array>} массив записей
 */
export async function getServiceRecords(carId) {
  try {
    const res = await fetch(`${BASE_URL}/records?carId=${carId}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch service records: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.error("Error in getServiceRecords:", err);
    return []; // возвращаем пустой массив при ошибке
  }
}

/**
 * Добавляем новую машину
 * @param {object} carData
 * @returns {Promise<object>}
 */
export async function addCar(carData) {
  try {
    const res = await fetch(`${BASE_URL}/cars`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(carData),
    });
    if (!res.ok) {
      throw new Error(`Failed to add car: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.error("Error in addCar:", err);
    return null;
  }
}

/**
 * Добавляем новую сервисную запись
 * @param {object} recordData
 * @returns {Promise<object>}
 */
export async function addServiceRecord(recordData) {
  try {
    const res = await fetch(`${BASE_URL}/records`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(recordData),
    });
    if (!res.ok) {
      throw new Error(`Failed to add service record: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.error("Error in addServiceRecord:", err);
    return null;
  }
}