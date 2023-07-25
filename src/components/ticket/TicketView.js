import React from "react";
import { Descriptions, Image } from 'antd';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';

const TicketView = () => {
    const { id } = useParams();
    const AllUsers = useSelector(state => state.user.allUsers);
    const ticket = useSelector(state => state.tickets.ticketList.find(({_id}) => _id === id))
    let ticketOwner = AllUsers && AllUsers.find(({ _id }) => _id === ticket.owner)
    if (ticketOwner) ticketOwner = ticketOwner.name || "NA"
    let ticketAssgiendTo = AllUsers && AllUsers.find(({ _id }) => _id === ticket.assigned_to)
    if (ticketAssgiendTo) ticketAssgiendTo = ticketAssgiendTo.name || "NA"
    
    return (
        <div className="content-container">
            <h1>Ticket Details  </h1>
            <Descriptions bordered
                column={1}
                labelStyle={{ fontSize: 16, fontWeight: "bold" }}
                contentStyle={{ fontSize: 16 }}
                size="middle"
            >
                <Descriptions.Item label="Title">{ticket.title}</Descriptions.Item>
                <Descriptions.Item label="Description">{ticket.description}</Descriptions.Item>
                <Descriptions.Item label="Assigned By">{ticketOwner}</Descriptions.Item>
                <Descriptions.Item label="Assigned To">{ticketAssgiendTo}</Descriptions.Item>
                <Descriptions.Item label="Status">{ticket.status}</Descriptions.Item>
                <Descriptions.Item label="Snaps">{ticket.ticket_files.length ?
                    ticket.ticket_files.map((ticketImage) => (
                        <Image key={ticketImage.fileId}  width={200} height={200} src={ticketImage.url} alt="ticketImage" />
                    )) : `No snapshot available!`}
                </Descriptions.Item>
            </Descriptions>
        </div>
    )
}

export default TicketView;
// const mapStateToProps = (state, props) => {
//     return {
//         ticket: state.tickets.ticketList.find(ticket => ticket._id === props.match.params.id),
//         AllUsers: state.user.allUsers
//     }
// }
// export default connect(mapStateToProps)(TicketView);