import React from "react";
import TicketForm from "./TicketForm";
import { connect } from "react-redux";
import { startAddTicket } from "./TicketAction";

const AddTicket = (props) => (
    <TicketForm title="Add Ticket" OnSubmit={(ticket) => {
        props.dispatch(startAddTicket(ticket))
        props.history.push('/mycreatedtickets')
    }} />
);

export default connect()(AddTicket);