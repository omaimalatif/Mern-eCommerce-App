import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL + "/api"
});

// Automatically inject JWT Bearer Token into all outgoing backend headers
API.interceptors.request.use(
    (config) => {
        // Change "token" if your login state saves it under another key (e.g., "userToken")
        const token = localStorage.getItem("token"); 
        
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default API;