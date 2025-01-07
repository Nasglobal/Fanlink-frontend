
import axios from 'axios';
import { readFromLocalStorage } from './utils';
const api_url = "https://fanlinkbackend.onrender.com/api";
// const api_url = "http://184.105.4.89:8000/api";
//const api_url = "http://127.0.0.1:8000/api";

const AUTH_API = axios.create({ baseURL: api_url });

// Add Authorization header dynamically
AUTH_API.interceptors.request.use((config) => {
    const token = readFromLocalStorage('token'); // Retrieve the token from localStorage
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const getProfile = () => AUTH_API.get('/profile/');

export const register = (userData) => AUTH_API.post('/register/', userData);
export const login = (userData) => AUTH_API.post('/login/', userData);

// export const api = "http://127.0.0.1:8000/api";
// export const base = "http://127.0.0.1:8000";

//export const api = "http://184.105.4.89:8000/api";
//export const base = "http://184.105.4.89:8000"


export const api = api_url;
export const base = "https://fanlinkbackend.onrender.com"



