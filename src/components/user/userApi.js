import { publicInstance, privateInstance } from "../../request/request";

export const create = (userData) => {
    return publicInstance.post('/v1/admin/user/create', userData
    // , { headers: { 'Authorization': 'sometoken' } }
    )
};

export const login = (data) => publicInstance.post('/v1/admin/user/login', data);

export const logout = (data) => privateInstance.post('/v1/admin/user/logout');