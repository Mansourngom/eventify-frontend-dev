import axios from 'axios';

const API = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
});

// Ajoute automatiquement le token JWT a chaque requete.
API.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Authentification
export const register = (data) => API.post('/register/', data);
export const login = (data) => API.post('/token/', data);
export const getMe = () => API.get('/me/');

// Evenements
export const getEvents = () => API.get('/events/');
export const getEvent = (id) => API.get(`/events/${id}/`);
export const createEvent = (data) => API.post('/events/', data);
export const updateEvent = (id, data) => API.put(`/events/${id}/`, data);
export const deleteEvent = (id) => API.delete(`/events/${id}/`);

// Inscriptions
export const registerToEvent = (eventId) => API.post(`/events/${eventId}/register/`);
export const getMyRegistrations = () => API.get('/my-registrations/');
export const getEventParticipants = (eventId) => API.get(`/events/${eventId}/participants/`);

// Dashboard
export const getDashboard = () => API.get('/dashboard/');
