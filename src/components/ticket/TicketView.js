import React from "react";
import { Descriptions } from 'antd';

const TicketView = () => (
    <div className="content-container">
        <h1>Ticket Details  </h1>
        <Descriptions bordered 
            column={1}
            labelStyle={{ fontSize: 16, fontWeight: "bold"}}
            contentStyle={{ fontSize: 16}}
            size="middle"
            >
            <Descriptions.Item label="Title">Ticket Title</Descriptions.Item>
            <Descriptions.Item label="Description">Ticket Description</Descriptions.Item>
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

export default TicketView;