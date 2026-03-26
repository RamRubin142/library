import axios from "axios";

const api = axios.create({
  baseURL: (import.meta.env.VITE_API_URL ?? "http://localhost:4000/") + "books",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getBooks = async () => {
  const res = await api.get("/");
  return res.data;
};

export const getBookById = async (id: string | null | undefined) => {
  if (!id) {
    return null;
  }
  const res = await api.get(`/${id}`);
  return res.data;
};

export const deleteBookById = async (id: string) => {
  const res = await api.delete(`/${id}`);
  return res.data;
};

export const updateBookNameById = async (id: string, name: string) => {
  const res = await api.patch(`/${id}`, JSON.stringify({ name }));
  return res.data;
};
