
import axios from 'axios';
import { readFromLocalStorage } from './utils';

const AUTH_API = axios.create({ baseURL: 'http://127.0.0.1:8000/api' });

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

export const api = "http://127.0.0.1:8000/api";
export const base = "http://127.0.0.1:8000";

//export const api = "http://184.105.4.89:8000/api";
//export const base = "http://184.105.4.89:8000"


//export const api = "https://stemgenserver.michost.top/api";
//export const base = "https://stemgenserver.michost.top"



