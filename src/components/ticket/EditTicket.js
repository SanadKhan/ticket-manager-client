import React from "react";
import TicketForm from "./TicketForm";
import { useParams, useHistory } from 'react-router-dom';
import { ticketApi } from ".";
import { useMutation, useQuery } from "react-query";

const EditTicket = () => {
    const history = useHistory();
    const { id } = useParams();
    
    const { data: ticket, status, error } = useQuery({
        queryKey: ["ticket", id],
        queryFn: () => ticketApi.read(id)
    });

    const updateTicketStatusMutation = useMutation({
        mutationFn: ticketApi.updateTicketStatus,
        onSuccess: () => {
            queryClient.invalidateQueries("tickets")
            message.success("Updated Successfully!")
        }
    })

    return (
        <TicketForm
            title="Edit Ticket"
            ticket={ticket}
            ticketFiles={ticket.ticket_files.length && ticket.ticket_files}
            OnSubmit={(ticketData) => {
                updateTicketStatusMutation.mutate({ ticketData, ticketId: ticket._id }, {
                    onSuccess: () => {
                        message.success("Ticket Added Successfully!")
                        history.push('/mycreatedtickets')
                    }
                })
            }}
        />
    )
};

export default EditTicket;