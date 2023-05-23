import React from "react";
import { Descriptions, Image, Space } from 'antd';
import { connect } from "react-redux";

const TicketView = (props) => (
    <div className="content-container">
        <h1>Ticket Details  </h1>
        <Descriptions bordered
            column={1}
            labelStyle={{ fontSize: 16, fontWeight: "bold" }}
            contentStyle={{ fontSize: 16 }}
            size="middle"
        >
            <Descriptions.Item label="Title">{props.ticket.title}</Descriptions.Item>
            <Descriptions.Item label="Description">{props.ticket.description}</Descriptions.Item>
            <Descriptions.Item label="Assigned By">{props.ticket.owner.name}</Descriptions.Item>
            <Descriptions.Item label="Assigned To">{props.ticket.assigned_to.name}</Descriptions.Item>
            <Descriptions.Item label="Status">{props.ticket.status}</Descriptions.Item>
            <Descriptions.Item label="Snaps">{props.ticket.ticket_files.length ?
                props.ticket.ticket_files.map((ticketImage) => (
                    <Space size={50}>
                        <Image width={200} height={200} src={ticketImage.url} alt="ticketImage" />
                    </Space>
                )) : `No snapshot available!`}
            </Descriptions.Item>
        </Descriptions>
    </div>
)

const mapStateToProps = (state, props) => {
    return {
        ticket: state.tickets.find(ticket => ticket._id === props.match.params.id)
    }
}
export default connect(mapStateToProps)(TicketView);