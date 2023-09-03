import axios from "axios";

export const endPointBaseUrl = process.env.API_BASE_URL || 'http://localhost:8000'

export const publicInstance = axios.create({
    baseURL: endPointBaseUrl,
});

export const privateInstance = axios.create({
    baseURL: endPointBaseUrl
}); 

privateInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth-token');
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})

privateInstance.interceptors.response.use(function(response) {
    return response;
}, function(error){
    if (error.response.status === 401) {
        localStorage.removeItem('auth-token')
        window.location = '/';
    } else {
        return Promise.reject(error);
    }
})