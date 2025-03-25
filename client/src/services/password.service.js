import api from './api';

export const getAllPasswords = async () => {
  const response = await api.get('/passwords');
  return response.data;
};

export const createPassword = async (passwordData) => {
  const response = await api.post('/passwords', passwordData);
  return response.data;
};

export const updatePassword = async (id, passwordData) => {
  const response = await api.put(`/passwords/${id}`, passwordData);
  return response.data;
};

export const deletePassword = async (id) => {
  const response = await api.delete(`/passwords/${id}`);
  return response.data;
}; 