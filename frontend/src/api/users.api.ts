import axios from "axios";

const api = axios.create({
  baseURL: (import.meta.env.VITE_API_URL ?? "http://localhost:4000/")  + "users",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getUsers = async () => {
  const res = await api.get("/");
  return res.data;
};

export const getUserById = async (id: string | null) => {
  if(!id) {
    return null;
  }
  const res = await api.get(`/${id}`);
  return res.data;
};

export const deleteUserById = async (id: string) => {
  const res = await api.delete(`/${id}`);
  return res.data;
};

export const updateUserNameById = async (id: string, name: string) => {
  const res = await api.patch(`/${id}`, JSON.stringify({ name }));
  return res.data;
};

export const addBooksToUser = async (userId: string, bookId: string) => {
  const res = await api.post(`/books/${userId}`, JSON.stringify({ bookId }));
  return res.data;
};

export const deleteBooksFromUser = async (userId: string, bookId: string) => {
  const res = await api.delete(`/books/${userId}`, {
    data: { bookId },
  });
  return res.data;
};

export const favoriteBooksOfUser = async (userId: string, bookId: string) => {
  const res = await api.patch(`/books/${userId}`, JSON.stringify({ bookId }));
  return res.data;
};
