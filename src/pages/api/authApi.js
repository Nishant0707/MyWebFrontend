import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const loginAdmin = async (email, password) => {
  return await axios.post(`${API}/auth/login`, { email, password });
};
