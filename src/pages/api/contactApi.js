import axios from "axios";

const API = import.meta.env.VITE_API_URL;

export const sendContact = (data) =>
  axios.post(`${API}/api/contact`, data);
