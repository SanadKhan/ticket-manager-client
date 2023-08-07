import React from "react";
import { Descriptions, Image } from 'antd';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import { useQuery } from "react-query";
import { userApi } from "../user";
import { ticketApi } from ".";

const TicketView = () => {
    const { id } = useParams();
    let ticketOwnerQuery, ticketAssgiendToQuery;
    // const AllUsers = useSelector(state => state.user.allUsers);
    // const ticket = useSelector(state => state.tickets.ticketList.find(({_id}) => _id === id))
    // console.log("id", id)
    const { data: ticket, status, error } = useQuery({
        queryKey: ["ticket", id],
        queryFn: () => ticketApi.read(id)
    })

    console.log("ticket", ticket);

    
    // const ticketOwnerQuery = useQuery({
    //     queryKey: ["users", ticket && ticket.owner],
    //     enabled: ticket.owner !== null, 
    //     queryFn: () => userApi.read(ticket.owner)
    // })
    // console.log("ticket owner to", ticketOwnerQuery.data);
    // const ticketAssgiendToQuery = useQuery({
    //     queryKey: ["users", ticket && ticket.assigned_to],
    //     enabled: ticket.assigned_to !== null, 
    //     queryFn: () => userApi.read(ticket.assigned_to)
    // })
    // console.log("ticket assigned", ticketOwnerQuery.data);
    // let ticketOwner = AllUsers && AllUsers.find(({ _id }) => _id === ticket.owner)
    // if (ticketOwner) ticketOwner = ticketOwner.name || "NA"
    // let ticketAssgiendTo = AllUsers && AllUsers.find(({ _id }) => _id === ticket.assigned_to)
    // if (ticketAssgiendTo) ticketAssgiendTo = ticketAssgiendTo.name || "NA"
    if (status === "loading") return <h1>Loading...</h1>
    if (status === "error") {
        return <h1>{JSON.stringify(error)}</h1>
    }

    // if (ticket.owner) {
    //     ticketOwnerQuery = useQuery({
    //         queryKey: ["users", ticket.owner],
    //         queryFn: () => userApi.read(ticket.owner)
    //     })
    // }

    // if (ticket.assigned_to) {
    //     ticketAssgiendToQuery = useQuery({
    //         queryKey: ["users", ticket.assigned_to],
    //         queryFn: () => userApi.read(ticket.assigned_to)
    //     })
    // }
    // console.log("ticket owner", ticketOwnerQuery)
    // console.log("ticket assgiend", ticketAssgiendToQuery)
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
                <Descriptions.Item label="Assigned By">
                    { ticket.owner }
                </Descriptions.Item>
                <Descriptions.Item label="Assigned To">
                    { ticket.assigned_to }
                </Descriptions.Item>
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
// import React from "react";
// import { Descriptions, Image } from 'antd';
// import { useSelector } from "react-redux";
// import { useParams } from 'react-router-dom';

// const TicketView = () => {
//     const { id } = useParams();
//     const AllUsers = useSelector(state => state.user.allUsers);
//     const ticket = useSelector(state => state.tickets.ticketList.find(({_id}) => _id === id))
//     let ticketOwner = AllUsers && AllUsers.find(({ _id }) => _id === ticket.owner)
//     if (ticketOwner) ticketOwner = ticketOwner.name || "NA"
//     let ticketAssgiendTo = AllUsers && AllUsers.find(({ _id }) => _id === ticket.assigned_to)
//     if (ticketAssgiendTo) ticketAssgiendTo = ticketAssgiendTo.name || "NA"
    
//     return (
//         <div className="content-container">
//             <h1>Ticket Details  </h1>
//             <Descriptions bordered
//                 column={1}
//                 labelStyle={{ fontSize: 16, fontWeight: "bold" }}
//                 contentStyle={{ fontSize: 16 }}
//                 size="middle"
//             >
//                 <Descriptions.Item label="Title">{ticket.title}</Descriptions.Item>
//                 <Descriptions.Item label="Description">{ticket.description}</Descriptions.Item>
//                 <Descriptions.Item label="Assigned By">{ticketOwner}</Descriptions.Item>
//                 <Descriptions.Item label="Assigned To">{ticketAssgiendTo}</Descriptions.Item>
//                 <Descriptions.Item label="Status">{ticket.status}</Descriptions.Item>
//                 <Descriptions.Item label="Snaps">{ticket.ticket_files.length ?
//                     ticket.ticket_files.map((ticketImage) => (
//                         <Image key={ticketImage.fileId}  width={200} height={200} src={ticketImage.url} alt="ticketImage" />
//                     )) : `No snapshot available!`}
//                 </Descriptions.Item>
//             </Descriptions>
//         </div>
//     )
// }

// export default TicketView;