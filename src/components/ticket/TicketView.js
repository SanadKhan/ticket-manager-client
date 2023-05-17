import React from "react";
import { Descriptions } from 'antd';
import { connect } from "react-redux";

const TicketView = (props) => (
    
    <div className="content-container">
        <h1>Ticket Details  </h1>
        <Descriptions bordered 
            column={1}
            labelStyle={{ fontSize: 16, fontWeight: "bold"}}
            contentStyle={{ fontSize: 16}}
            size="middle"
            >
            <Descriptions.Item label="Title">{props.title}</Descriptions.Item>
            <Descriptions.Item label="Description">{props.description}</Descriptions.Item>
            <Descriptions.Item label="Assigned By">Andrew</Descriptions.Item>
            <Descriptions.Item label="Assigned To">Andrew</Descriptions.Item>
            <Descriptions.Item label="Status">
                Completed
            </Descriptions.Item>
            <Descriptions.Item label="Snaps">
                No snapshot available!
            </Descriptions.Item>
        </Descriptions>
    </div>
);

const mapStateToProps = (state, props) => {
    return {
        ticket : state.ticket.find(ticket => ticket._id === props.match.params.id)
    }
}
export default connect(mapStateToProps)(TicketView);