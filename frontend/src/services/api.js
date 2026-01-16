import axios from 'axios'
// const BASE_URL = "https://ai-notes-tf5p.onrender.com/api"
const api = axios.create({
    baseURL:"https://ai-notes-tf5p.onrender.com/api",
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
