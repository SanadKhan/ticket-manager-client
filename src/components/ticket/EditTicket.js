import React from "react";
import TicketForm from "./TicketForm";
import { connect } from "react-redux";
import { startUpdateTicket } from "./TicketAction";

const EditTicket = (props) => (
    <div className="user-container">
        <div className="user-item user-form-ticket">
            <TicketForm title="Edit Ticket"
                ticket={props.ticket}
                ticketFiles={props.ticket.ticket_files.length ? props.ticket.ticket_files : []}
                OnSubmit={(ticket) => {
                    props.dispatch(startUpdateTicket(props.ticket._id, ticket))
                    props.history.push('/mycreatedtickets')
                }} />
        </div>
    </div>
);

const mapStateToProps = (state, props) => {
    return {
        ticket: state.tickets.find((ticket) => ticket._id === props.match.params.id)
    }
};
export default connect(mapStateToProps)(EditTicket);