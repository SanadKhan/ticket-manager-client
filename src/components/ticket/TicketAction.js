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
                console.log("response data", res.data)
                dispatch(addTicket(res.data))
                dispatch(apiSuccess("Created Successfully!"))
            }).catch((err) => {
                dispatch(apiError(err.response.data.msgText))
                console.log("Axios Error", err)
            })
        dispatch(setLoading(false))
    }
}