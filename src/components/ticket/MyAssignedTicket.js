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
    status: 'Pending'
  },
  {
    key: '2',
    title: 'Second Ticket',
    descp: 'Description of second ticket',
    assignedby: 'Jen',
    status: 'Completed'
  },
  {
    key: '3',
    title: 'Third Ticket',
    descp: 'Description of third ticket',
    assignedby: 'Andrew',
    status: 'Pending'
  },
];

const MyAssignedTicket = () => (
    <div className="content-container">
        <h1>Tickets Assigned To Me</h1>
        <Table dataSource={data}>
            <Column className="table-column" title="Title" dataIndex="title" key="title" />
            <Column className="table-column" title="Description" dataIndex="descp" key="descp" />
            <Column className="table-column" title="Assinged By" dataIndex="assignedby" key="assignedby" />
            <Column 
                className="table-column" 
                title="Status"  
                key="status"
                render={(text, record) => (
                  <div>
                    { record.status == 'Completed' ? record.status :
                      <select> 
                        <option value="Pending">Pending</option>
                        <option value="Completed">Completed</option>
                      </select>
                    }
                  </div>
                )} 
            />
            <Column
              className="table-column"
              title="Action"
              key="action"
              render={() => (
                  <div>
                    <Link to="/"> View </Link>
                  </div>
              )}
            />
        </Table>
    </div>
);

export default MyAssignedTicket;