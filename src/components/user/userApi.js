import { publicInstance, privateInstance } from "../../request/request";

export const create = (userData) => {
    return publicInstance
        .post('/v1/admin/user/create', userData)
        .then(res => res.data);
};

export const readAll = () => {
    return publicInstance
        .get('/v1/admin/user')
        .then(res => res.data.user);
}

export const read = (id) => {
    return privateInstance
        .get(`/v1/admin/user/read/${id}`)
        .then(res => res.data.user);
};

export const login = (data) => {
    return publicInstance
        .post('/v1/admin/user/login', data)
        .then(res => res.data);
};

export const logout = () => {
    return privateInstance.post('/v1/admin/user/logout');
};
