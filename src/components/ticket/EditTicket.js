import React from "react";
import TicketForm from "./TicketForm";
import { useParams, useHistory } from 'react-router-dom';
import { ticketApi } from ".";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { message } from "antd";

const EditTicket = () => {
    const history = useHistory();
    const { id } = useParams();
    const queryClient = useQueryClient();

    const { data: ticket, isLoading, isError, error } = useQuery({
        queryKey: ["ticket", id],
        queryFn: () => ticketApi.read(id),
    });

    const updateTicketStatusMutation = useMutation({
        mutationFn: ticketApi.update,
        onSuccess: () => {
            queryClient.invalidateQueries("tickets")
        }
    })

    if (isLoading) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    return (
        <TicketForm
            title="Edit Ticket"
            ticket={ticket}
            ticketFiles={ ticket.ticket_files && ticket.ticket_files }
            OnSubmit={(ticketData) => {
                updateTicketStatusMutation.mutate({ ticketData, ticketId: ticket._id }, {
                    onSuccess: () => {
                        message.success("Ticket Updated Successfully!")
                        history.push('/mycreatedtickets')
                    }
                })
            }}
        />
    )
};

export default EditTicket;