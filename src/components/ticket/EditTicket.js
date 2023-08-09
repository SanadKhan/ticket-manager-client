import React, { useState } from "react";
import TicketForm from "./TicketForm";
import { useParams, useHistory } from 'react-router-dom';
import { ticketApi } from ".";
import { useMutation, useQuery, useQueryClient } from "react-query";

const EditTicket = () => {
    const history = useHistory();
    const { id } = useParams();
    const queryClient = useQueryClient();
    const [ ticketFiles, setTicketFiles ] = useState([])

    const { data: ticket, status, error } = useQuery({
        queryKey: ["ticket", id],
        queryFn: () => ticketApi.read(id),
        onSuccess: data => {
            if (data.ticket_files.length) {
                console.log("ticketfiles", data.ticket_files)
                setTicketFiles(data.ticket_files);
            }
        }
    });

    const updateTicketStatusMutation = useMutation({
        mutationFn: ticketApi.update,
        onSuccess: () => {
            queryClient.invalidateQueries("tickets")
        }
    })

    return (
        // <div>
        //     <h1>Edi ticke</h1>
        //     </div>
        <TicketForm
            title="Edit Ticket"
            ticket={ticket}
            ticketFiles={ticketFiles}
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