import { privateInstance } from "../../request/request";

export const readAll = () => privateInstance.get(`/v1/admin/ticket`);

export const create = (ticketData) => privateInstance.post('/v1/admin/ticket/create', ticketData);

export const read = (id) => privateInstance.get(`/v1/admin/ticket/${id}`);

export const update = ({ ticketData, id }) => privateInstance.post(`/v1/admin/user/update/${id}`, ticketData);

export const remove = (ids) => privateInstance.post(`/v1/admin/user/delete`, ids);