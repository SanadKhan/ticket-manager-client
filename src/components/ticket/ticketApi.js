import { privateInstance } from "../../request/request";

export const readAllTicket = (filter, page, perPage) => {
    return privateInstance
        .post(`/v1/admin/ticket?p=${page}&r=${perPage}`, filter)
        .then(res => res.data.ticket);
};

export const create = (ticketData) => {
    return privateInstance
        .post('/v1/admin/ticket/create', ticketData)
        .then(res => res.data);
};

export const read = (id) => {
    return privateInstance
        .get(`/v1/admin/ticket/${id}`)
        .then(res => res.data);
};

export const update = (ticketData, ticketId) => {
    return privateInstance
        .post(`/v1/admin/ticket/update/${ticketId}`, ticketData)
        .then(res => { ticketData: res.data, ticketId});
};

export const updateTicketStatus = (ticketData, ticketId) => {
    return privateInstance
        .post(`/v1/admin/ticket/updateTicketStatus/${ticketId}`, ticketData)
        .then(res => { ticketData: res.data, ticketId });
};

export const remove = (id) => {
    return privateInstance
        .post(`/v1/admin/ticket/delete/${id}`)
        .then(res => id);
};


//with Redux
// export const readAllTicket = (filter, page, perPage) => privateInstance.post(`/v1/admin/ticket?p=${page}&r=${perPage}`, filter);

// export const create = (ticketData) => privateInstance.post('/v1/admin/ticket/create', ticketData);

// export const read = (id) => privateInstance.get(`/v1/admin/ticket/${id}`);

// export const update = (ticketData, ticketId) => privateInstance.post(`/v1/admin/ticket/update/${ticketId}`, ticketData);

// export const updateTicketStatus = (ticketData, ticketId) => privateInstance.post(`/v1/admin/ticket/updateTicketStatus/${ticketId}`, ticketData);

// export const remove = (id) => privateInstance.post(`/v1/admin/ticket/delete/${id}`);

