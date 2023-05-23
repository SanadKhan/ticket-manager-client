import { privateInstance } from "../../request/request";

export const readAll = () => privateInstance.get(`/v1/admin/ticket`);

export const create = (ticketData) => privateInstance.post('/v1/admin/ticket/create', ticketData);

export const read = (id) => privateInstance.get(`/v1/admin/ticket/${id}`);

export const update = ({ ticketData, id }) => privateInstance.post(`/v1/admin/ticket/update/${id}`, ticketData);

export const remove = (id) => privateInstance.post(`/v1/admin/ticket/delete/${id}`);

export const uploadFiles = (files) => {
    return privateInstance.post('/v1/admin/ticket/uploadFiles', files, {
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        }
    });
};
