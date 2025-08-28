import axios from 'axios';

const hostname = window.location.hostname;
const API_URL = `http://${hostname}:3000/api`;

const api = axios.create({
    baseURL: API_URL,
    // credentials: true,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
})

export default api;