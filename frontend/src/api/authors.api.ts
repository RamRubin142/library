import axios from "axios";

const api = axios.create({
  baseURL:
    (import.meta.env.VITE_API_URL ?? "http://localhost:4000/") + "authors",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getAuthors = async () => {
  const res = await api.get("/");
  return res.data;
};

export const getAuthorById = async (id: string | null) => {
  if (!id) {
    return null;
  }
  const res = await api.get(`/${id}`);
  return res.data;
};

export const deleteAuthorById = async (id: string) => {
  const res = await api.delete(`/${id}`);
  return res.data;
};

export const updateAuthorNameById = async (id: string, name: string) => {
  const res = await api.patch(`/${id}`, JSON.stringify({ name }));
  return res.data;
};
