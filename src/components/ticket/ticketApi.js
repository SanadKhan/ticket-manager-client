import { privateInstance } from "../../request/request";

export const readAllTicket = (page, perPage) => privateInstance.get(`/v1/admin/ticket?p=${page}&r=${perPage}`);

export const readAllFilteredTicket = (id, page, perPage) => privateInstance.get(`/v1/admin/filteredTicket/${id}?p=${page}&r=${perPage}`);

export const create = (ticketData) => privateInstance.post('/v1/admin/ticket/create', ticketData);

export const read = (id) => privateInstance.get(`/v1/admin/ticket/${id}`);

export const update = (ticketData, ticketId) => privateInstance.post(`/v1/admin/ticket/update/${ticketId}`, ticketData);

export const updateTicketStatus = (ticketData, ticketId) => privateInstance.post(`/v1/admin/ticket/updateTicketStatus/${ticketId}`, ticketData);

export const remove = (id) => privateInstance.post(`/v1/admin/ticket/delete/${id}`);

