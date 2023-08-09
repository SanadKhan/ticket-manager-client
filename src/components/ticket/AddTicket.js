import React from "react";
import TicketForm from "./TicketForm";
import { useHistory } from "react-router-dom";
import { useMutation } from "react-query";
import { ticketApi } from ".";
import { message } from "antd";

const AddTicket = () => {
    const history = useHistory();
    const createTicketMutation = useMutation({
        mutationFn: ticketApi.create
    });
    return (
        <TicketForm
            title="Add Ticket"
            OnSubmit={(ticket) => {
                createTicketMutation.mutate(ticket, {
                    onSuccess: () => {
                        message.success("Ticket Added Successfully!")
                        history.push('/mycreatedtickets')
                    }
                })
                // dispatch(startAddTicket(ticket));
                // history.push('/mycreatedtickets')
            }} />
    )
};

export default AddTicket;