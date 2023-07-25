import React from "react";
import TicketForm from "./TicketForm";
import { connect, useDispatch, useSelector } from "react-redux";
import { startUpdateTicket } from "./TicketAction";
import { useParams, useHistory } from 'react-router-dom';

const EditTicket = () => {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const ticket = useSelector(state => state.tickets.ticketList.find((ticket) => ticket._id === id))
    return (
        <TicketForm
            title="Edit Ticket"
            ticket={ticket}
            ticketFiles={ticket.ticket_files.length ? ticket.ticket_files : []}
            OnSubmit={(ticketData) => {
                dispatch(startUpdateTicket(ticketData, ticket._id))
                history.push('/mycreatedtickets')
            }}
        />
    )
};

export default EditTicket;
// const mapStateToProps = (state, props) => {
//     return {
//         ticket: state.tickets.ticketList.find((ticket) => ticket._id === props.match.params.id)
//     }
// };
// export default connect(mapStateToProps)(EditTicket);