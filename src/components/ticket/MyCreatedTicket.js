import React from "react";
import { Button, Table, Space } from 'antd';
import { Link } from "react-router-dom";

const { Column } = Table;
const data = [
    {
      key: '1',
      title: 'First Ticket',
      descp: 'Description of first ticket',
      assignedto: 'Andrew',
      status: 'Pending'
    },
    {
      key: '2',
      title: 'Second Ticket',
      descp: 'Description of second ticket',
      assignedto: 'Jen',
      status: 'Completed'
    },
    {
      key: '3',
      title: 'Third Ticket',
      descp: 'Description of third ticket',
      assignedto: 'Jess',
      status: 'Pending'
    },
  ];

const MyCreatedTicket = () => (
    <div className="content-container">
        <h1>My Created Tickets</h1>
        <Button type="primary"  htmlType="submit" size="large" >
          <Link to="/ticket/add">Add Ticket</Link> 
        </Button>
        <Table dataSource={data}>
            <Column className="table-column" title="Title" dataIndex="title" key="title" />
            <Column className="table-column" title="Description" dataIndex="descp" key="descp" />
            <Column className="table-column" title="Assinged To" dataIndex="assignedto" key="assignedto" />
            <Column className="table-column" title="Status" dataIndex="status" key="status" />
            <Column
                className="table-column"
                title="Action"
                key="action"
                render={() => (
                  <Space size="small">
                    <Link to="/ticket/view/1" className="table-column"> View </Link>
                    <Link to="/ticket/edit/1" className="table-column table-edit"> Edit </Link>
                    <Link to="/" className="table-column table-delete">Delete</Link>
                  </Space>
                )}
            />
        </Table>
    </div>
);

export default MyCreatedTicket;