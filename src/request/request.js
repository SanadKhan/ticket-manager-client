import axios from "axios";

export const endPointBaseUrl = process.env.API_BASE_URL || 'http://localhost:8000'
const token = localStorage.getItem('auth-token');

export const publicInstance = axios.create({
    baseURL: endPointBaseUrl,
    // headers: {
    //     'content-type': 'application/x-www-form-urlencoded'
    // }
});

export const privateInstance = axios.create({
    baseURL: endPointBaseUrl,
    headers: {
        'Authorization': `Bearer ${token}`
    }
}); 

// privateInstance.interceptors.request.use((config) => {
//     const token = localStorage.getItem('auth-token');
//     config.headers.Authorization = `Bearer ${token}`;
//     return config;
// })

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