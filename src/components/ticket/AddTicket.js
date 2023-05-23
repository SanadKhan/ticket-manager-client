import React from "react";
import TicketForm from "./TicketForm";
import { connect } from "react-redux";
import { startAddTicket } from "./TicketAction";

const AddTicket = (props) => (
    <div className="user-container">
        <div className="user-item user-form-ticket">
            <TicketForm title="Add Ticket" OnSubmit={(ticket) => {
                props.dispatch(startAddTicket(ticket))
                props.history.push('/mycreatedtickets')
            } } />
        </div>
    </div>
);

export default connect()(AddTicket);