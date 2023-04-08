import axios from "axios";

export const fetchPublicData = axios.create({
    baseURL: process.env.API_BASE_URL,
});

export const fetchPrivateData = axios.create({
    baseURL: process.env.API_BASE_URL,
    headers: {
        Authorization: 'Bearer ${jwt}',
    }
}); 