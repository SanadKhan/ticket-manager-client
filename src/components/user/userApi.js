import { publicInstance, privateInstance } from "../../request/request";

export const create = (userData) => publicInstance.post('/v1/admin/user/create', userData);

export const readAll = () => publicInstance.get('/v1/admin/user');

export const login = (data) => publicInstance.post('/v1/admin/user/login', data);

export const logout = () => privateInstance.post('/v1/admin/user/logout');