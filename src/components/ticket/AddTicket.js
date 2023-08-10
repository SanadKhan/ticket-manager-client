import React from "react";
import TicketForm from "./TicketForm";
import { useHistory } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { ticketApi } from ".";
import { message } from "antd";

const AddTicket = () => {
    const history = useHistory();
    const queryClient = useQueryClient();

    const createTicketMutation = useMutation({
        mutationFn: ticketApi.create,
        onSuccess: () => {
            queryClient.invalidateQueries("tickets")
        }
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
            }} />
    )
};

export default AddTicket;