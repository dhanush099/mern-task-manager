// client/src/utils/api.js
import axios from 'axios';

// Set the base URL to your Express backend
// Ensure this matches the port your server is running on (e.g., 5000)
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Function to get the JWT token from localStorage
export const getToken = () => {
    return localStorage.getItem('token');
};

// Function to create config headers for private routes
export const getConfig = () => {
    const token = getToken();
    return {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    };
};

export default axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});