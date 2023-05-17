import React from "react";
import { Button, Table, Space } from 'antd';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { startReadAllTicket } from "./TicketAction";

class MyCreatedTicket extends React.Component {
  
  componentDidMount() {
    this.props.dispatch(startReadAllTicket());
  }

  columns = [
    {
      title: "Sr No.",
      dataIndex: "id",
      key: "id",
      render: (id, record, index) => {
        ++index;
        return index;
      }
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "titles"
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description"
    },
    {
      title: "Assigned By",
      dataIndex: "owner",
      key: "owner"
    },
    {
      title: "Assigned To",
      dataIndex: "assigned_to",
      key: "assigned_to"
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status"
    }
    ,
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="small">
          <Link to={`/ticket/view/${record.key}`} className="table-column"> View </Link>
          <Link to={`/ticket/edit/${record.key}`} className="table-column table-edit"> Edit </Link>
          <Link to={`/ticket/delete/${record.key}`} className="table-column table-delete">Delete</Link>
        </Space>
      )
    },
  ];

  render() {
    const assignedTickets = this.props.tickets.length && this.props.tickets.filter(ticket => ticket.owner === this.props.userId)
    const data = assignedTickets.length ? assignedTickets.map((item) => ({
      key: item._id,
      title: item.title,
      description: item.description,
      owner: item.owner,
      assigned_to: item.assigned_to,
      status: item.status
    })) : [];

    return (
      <div className="content-container">
        <h1>My Created Tickets</h1>
        <Button type="primary" htmlType="submit" size="large" >
          <Link to="/ticket/add">Add Ticket</Link>
        </Button>
        <Table columns={this.columns} dataSource={data} loading={this.props.isLoading} />
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    userId: state.user.user._id,
    tickets: state.tickets,
    isLoading: state.isLoading
  }
};

export default connect(mapStateToProps)(MyCreatedTicket);