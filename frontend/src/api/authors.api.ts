import { api } from "./axiosConfig";

export const getAuthors = async () => {
  const res = await api.get("/authors/");
  return res.data;
};

export const getAuthorById = async (id: string | null) => {
  if (!id) {
    return null;
  }
  const res = await api.get(`/authors/${id}`);
  return res.data;
};

export const deleteAuthorById = async (id: string) => {
  const res = await api.delete(`/authors/${id}`);
  return res.data;
};

export const updateAuthorNameById = async (id: string, name: string) => {
  const res = await api.patch(`/authors/${id}`, JSON.stringify({ name }));
  return res.data;
};
