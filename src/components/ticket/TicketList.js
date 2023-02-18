import React from "react";
import { Table } from 'antd';
import { Link } from "react-router-dom";

const { Column } = Table;
const data = [
  {
    key: '1',
    title: 'First Ticket',
    descp: 'Description of first ticket',
    assignedby: 'Andrew',
    assignedto: 'Andrew',
    status: 'Pending'
  },
  {
    key: '2',
    title: 'Second Ticket',
    descp: 'Description of second ticket',
    assignedby: 'Jen',
    assignedto: 'Andrew',
    status: 'Completed'
  },
  {
    key: '3',
    title: 'Third Ticket',
    descp: 'Description of third ticket',
    assignedby: 'Andrew',
    assignedto: 'Jess',
    status: 'Pending'
  },
];

const TicketList = () => (
  <div className="content-container">
    <h2 className="welcome-message">Welcome, Andrew</h2>
    <h1>All Tickets</h1>
    <Table dataSource={data}>
      <Column className="table-column" title="Title" dataIndex="title" key="title" />
      <Column className="table-column" title="Description" dataIndex="descp" key="descp" />
      <Column className="table-column" title="Assinged By" dataIndex="assignedby" key="assignedby" />
      <Column className="table-column" title="Assinged To" dataIndex="assignedto" key="asignedto" />
      <Column className="table-column" title="Status" dataIndex="status" key="status" />
      <Column
        className="table-column"
        title="Action"
        key="action"
        // render={(text, record) => (
        //   <Space size="middle">
        //     <a>Invite</a>
        //     <a>Delete</a>
        //   </Space>
        // )}
        render={ () => (
          <div>
            <Link to="/"> View </Link>
          </div>
        )}
      />
    </Table>
  </div>  
);

export default TicketList;