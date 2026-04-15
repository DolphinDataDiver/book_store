import axios from "axios";

let accessToken = "";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const nextConfig = { ...config };

  if (accessToken) {
    nextConfig.headers = {
      ...nextConfig.headers,
      Authorization: `Bearer ${accessToken}`,
    };
  }

  return nextConfig;
});

export function setAccessToken(token) {
  accessToken = token || "";
}

export function clearAccessToken() {
  accessToken = "";
}

export async function getProfile() {
  const response = await api.get("/api/auth/profile");
  return response.data;
}

export async function loginWithPassword({ username, password }) {
  const keycloakBaseUrl =
    import.meta.env.VITE_KEYCLOAK_BASE_URL || "http://localhost:8080";
  const keycloakRealm = import.meta.env.VITE_KEYCLOAK_REALM || "book-store";
  const clientId =
    import.meta.env.VITE_KEYCLOAK_CLIENT_ID || "book-store-frontend";

  const body = new URLSearchParams({
    grant_type: "password",
    client_id: clientId,
    username,
    password,
  });

  const response = await fetch(
    `${keycloakBaseUrl}/realms/${keycloakRealm}/protocol/openid-connect/token`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    },
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error_description || "Login failed");
  }

  return data;
}

export async function getBooks() {
  const response = await api.get("/api/books");
  return response.data;
}

export async function getBookById(id) {
  const response = await api.get(`/api/books/${id}`);
  return response.data;
}

export async function createBook(payload) {
  const response = await api.post("/api/books", payload);
  return response.data;
}

export async function updateBook(id, payload) {
  const response = await api.put(`/api/books/${id}`, payload);
  return response.data;
}

export async function deleteBook(id) {
  await api.delete(`/api/books/${id}`);
}

export async function getClients() {
  const response = await api.get("/api/clients");
  return response.data;
}

export async function getClientById(id) {
  const response = await api.get(`/api/clients/${id}`);
  return response.data;
}

export async function createClient(payload) {
  const response = await api.post("/api/clients", payload);
  return response.data;
}

export async function deleteClient(id) {
  await api.delete(`/api/clients/${id}`);
}

export async function getOrders() {
  const response = await api.get("/api/orders");
  return response.data;
}

export async function getOrderById(id) {
  const response = await api.get(`/api/orders/${id}`);
  return response.data;
}

export async function createOrder(payload) {
  const response = await api.post("/api/orders", payload);
  return response.data;
}

export async function deleteOrder(id) {
  await api.delete(`/api/orders/${id}`);
}

export async function createCategory(payload) {
  const response = await api.post("/api/categories", payload);
  return response.data;
}

export async function deleteCategory(id) {
  await api.delete(`/api/categories/${id}`);
}

export async function createOrderItem(payload) {
  const response = await api.post("/api/orderitems", payload);
  return response.data;
}

export async function getOrderItemById(id) {
  const response = await api.get(`/api/orderitems/${id}`);
  return response.data;
}
