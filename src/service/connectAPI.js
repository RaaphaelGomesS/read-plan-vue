import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      alert('Sua sessão expirou. Faça login novamente.');
    }
    return Promise.reject(error);
  }
)

export async function login(email, password) {
  const response = await api.post("/login", { email, password });
  return response.data;
}

export async function register(name, email, password) {
  const response = await api.post("/register", { name, email, password });
  return response.data;
}

export async function saveBooks(books) {
  await api.post("/book", { books });
}

export async function loadBooks() {
  const response = await api.get("/book");
  if (response.data.length === 0) {
    return [];
  }
  return response.data;
}

export async function loadFinishedBooks() {
  const response = await api.get("/book/finished");
  if (response.data.length === 0) {
    return [];
  }
  return response.data;
}

export async function finishBook(id) {
  await api.put(`/book/finish/${id}`);
}

export async function unfinishBook(id) {
  await api.put(`/book/unfinish/${id}`);
}

export async function deleteBook(id) {
  await api.delete(`/book/${id}`);
}
