import React from "react";
import TicketForm from "./TicketForm";
import { connect } from "react-redux";
import { startUpdateTicket } from "./TicketAction";

const EditTicket = (props) => (
    <TicketForm
        title="Edit Ticket"
        ticket={props.ticket}
        ticketFiles={props.ticket.ticket_files.length ? props.ticket.ticket_files : []}
        OnSubmit={(ticket) => {
            props.dispatch(startUpdateTicket(ticket, props.ticket._id))
            props.history.push('/mycreatedtickets')
        }}
    />
);

const mapStateToProps = (state, props) => {
    return {
        ticket: state.tickets.myCreatedTickets.find((ticket) => ticket._id === props.match.params.id)
    }
};
export default connect(mapStateToProps)(EditTicket);