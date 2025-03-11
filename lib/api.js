
import axios from 'axios';
import { readFromLocalStorage, writeToLocalStorage, removeFromLocalStorage } from './utils';

const api_url = "https://fanlink.michost.top/api";
// const api_url = "http://184.105.4.89:8000/api";
//const api_url = "http://127.0.0.1:8000/api";

const AUTH_API = axios.create({ baseURL: api_url });

// Helper function to refresh the token
const refreshAccessToken = async () => {
    const refreshToken = readFromLocalStorage('refresh_token'); // Retrieve the refresh token
    if (!refreshToken) {
        throw new Error("No refresh token available");
    }

    try {
        const response = await axios.post(`${api_url}/token/refresh/`, {
            refresh: refreshToken,
        });
        const { access } = response.data;
        writeToLocalStorage('token', access); // Save new access token
        return access;
    } catch (error) {
        console.error("Failed to refresh access token:", error);
        removeFromLocalStorage('token');
        removeFromLocalStorage('refresh_token');
        window.location.href = '/auth/login'; // Redirect to login on failure
        throw error;
    }
};

// Add Authorization header dynamically with token refresh logic
AUTH_API.interceptors.request.use(
    async (config) => {
        let token = readFromLocalStorage('token');

        if (token) {
            // Check if token is expired
            const tokenExpiry = parseJwt(token)?.exp * 1000; // Convert expiry to milliseconds
            const now = Date.now();

            if (tokenExpiry && tokenExpiry < now) {
                try {
                    token = await refreshAccessToken(); // Refresh the token if expired
                } catch (error) {
                    removeFromLocalStorage('token');
                    console.error("Unable to refresh token. Logging out.");
                    return Promise.reject(error);
                }
            }

            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

// Utility function to decode JWT
const parseJwt = (token) => {
    try {
        return JSON.parse(atob(token.split('.')[1]));
    } catch (e) {
        return null;
    }
};

// API functions
export const getProfile = () => AUTH_API.get('/profile/');
export const register = (userData) => AUTH_API.post('/register/', userData);
export const login = (userData) => AUTH_API.post('/login/', userData);

export const api = api_url;
export const base = "https://fanlink.michost.top";
//export const base = "http://127.0.0.1:8000";
