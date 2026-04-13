import { api } from "./axiosConfig";

export const getUsers = async () => {
  const res = await api.get("/users/");
  return res.data;
};

export const getUserById = async (id: string | null) => {
  if (!id) {
    return null;
  }

  const res = await api.get(`/users/${id}`);
  return res.data;
};

export const deleteUserById = async (id: string) => {
  const res = await api.delete(`/users/${id}`);
  return res.data;
};

export const updateUserNameById = async (id: string, name: string) => {
  const res = await api.patch(`/users/${id}`, JSON.stringify({ name }));
  return res.data;
};

export const addBooksToUser = async (userId: string, bookId: string) => {
  const res = await api.post(`/users/books/${userId}`, JSON.stringify({ bookId }));
  return res.data;
};

export const deleteBooksFromUser = async (userId: string, bookId: string) => {
  const res = await api.delete(`/users/books/${userId}`, {
    data: { bookId },
  });
  return res.data;
};

export const favoriteBooksOfUser = async (userId: string, bookId: string) => {
  const res = await api.patch(`/users/books/${userId}`, JSON.stringify({ bookId }));
  return res.data;
};
