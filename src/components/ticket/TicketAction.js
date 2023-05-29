import { ticketApi } from ".";
import { apiError, apiSuccess, setLoading } from "../user/UserAction"

const readAllTicket = (data) => ({
    type: 'READALL_TICKET',
    payload: data
});

export const startReadAllTicket = () => {
    return (dispatch) => {
        dispatch(setLoading(true))
        ticketApi.readAll()
            .then((res) => {
                dispatch(readAllTicket(res.data.ticket))
            }).catch((err) => {
                dispatch(apiError(err.response.data.msgText));
                console.log("Axios Error", err);
            })
        dispatch(setLoading(false))
    }
};

const addTicket = (data) => ({
    type: 'ADD_TICKET',
    payload: data
});

export const startAddTicket = (ticketData = {}) => {
    return (dispatch) => {
        dispatch(setLoading(true))
        ticketApi.create(ticketData)
            .then((res) => {
                dispatch(addTicket(res.data))
                dispatch(apiSuccess("Created Successfully!"))
            }).catch((err) => {
                dispatch(apiError(err.response.data.msgText))
                console.log("Axios Error", err)
            })
        dispatch(setLoading(false))
    }
}

const updateTicket = (data, id) => ({
    type: 'UPDATE_TICKET',
    id,
    payload: data
});

export const startUpdateTicket = (ticketData, ticketId) => {
    return (dispatch) => {
        dispatch(setLoading(true))
        ticketApi.update(ticketData, ticketId)
            .then((res) => {
                dispatch(updateTicket(res.data, ticketId))
                dispatch(apiSuccess("Updated Successfully!"))
            }).catch((err) => {
                dispatch(apiError(err.response.data.msgText))
                console.log("Axios Error", err)
            })
        dispatch(setLoading(false))
    }
}

export const startUpdateTicketStatus = (ticketData, ticketId) => {
    return (dispatch) => {
        dispatch(setLoading(true))
        ticketApi.updateTicketStatus(ticketData, ticketId)
            .then((res) => {
                dispatch(updateTicket(res.data, ticketId))
                dispatch(apiSuccess("Updated Successfully!"))
            }).catch((err) => {
                dispatch(apiError(err.response.data.msgText))
                console.log("Axios Error", err)
            })
        dispatch(setLoading(false))
    }
}

const deleteTicket = (id) => ({
    type: 'DELETE_TICKET',
    id
});

export const startDeleteTicket = (ticketId) => {
    return (dispatch) => {
        dispatch(setLoading(true))
        ticketApi.remove(ticketId)
            .then((res) => {
                dispatch(deleteTicket(ticketId))
                dispatch(apiSuccess("Deleted Successfully!"))
            }).catch((err) => {
                // dispatch(apiError(err.response.data.msgText))
                console.log("Axios Error", err)
            })
        dispatch(setLoading(false))
    }
}
