import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

const api = axios.create({
	baseURL: API_BASE,
	headers: { "Content-Type": "application/json" },
});

export const getAuthors = () => api.get("/authors");
export const createAuthor = (data) => api.post("/authors/create", data);
export const getBooks = () => api.get("/books");
export const createBook = (data) => api.post("/books/create", data);

export default api;
