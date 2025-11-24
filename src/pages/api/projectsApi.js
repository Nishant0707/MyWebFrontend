import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const getProjects = () => axios.get(`${API}/api/projects`);

export const createProject = (data, token) =>
  axios.post(`${API}/api/projects`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateProject = (id, data, token) =>
  axios.put(`${API}/api/projects/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteProject = (id, token) =>
  axios.delete(`${API}/api/projects/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
