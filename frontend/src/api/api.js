const BASE_URL = "http://localhost:8080/api";

export async function getUsers() {
  const res = await fetch(`${BASE_URL}/users`);
  return res.json();
}

export async function getCars() {
  const res = await fetch(`${BASE_URL}/cars`);
  return res.json();
}

export async function getServiceRecords() {
  const res = await fetch(`${BASE_URL}/records`);
  return res.json();
}