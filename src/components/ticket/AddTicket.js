import React from "react";
import TicketForm from "./TicketForm";
import { connect, useDispatch } from "react-redux";
import { startAddTicket } from "./TicketAction";
import { useHistory } from "react-router-dom";

const AddTicket = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    return (
        <TicketForm
            title="Add Ticket"
            OnSubmit={(ticket) => {
                dispatch(startAddTicket(ticket));
                // return <Redirect to="/mycreatedtickets" />
                history.push('/mycreatedtickets')
            }} />
    )
};

export default AddTicket;
// export default connect()(AddTicket);