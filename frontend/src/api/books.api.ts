import {api} from "./axiosConfig";

export const getBooks = async () => {
  const res = await api.get("/books/");
  return res.data;
};

export const getBookById = async (id: string | null | undefined) => {
  if (!id) {
    return null;
  }
  const res = await api.get(`/books/${id}`);
  return res.data;
};

export const deleteBookById = async (id: string) => {
  const res = await api.delete(`/books/${id}`);
  return res.data;
};

export const updateBookNameById = async (id: string, name: string) => {
  const res = await api.patch(`/books/${id}`, JSON.stringify({ name }));
  return res.data;
};
