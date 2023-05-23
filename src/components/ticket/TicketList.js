import React from "react";
import { Table, Space } from 'antd';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { startReadAllTicket } from "./TicketAction";

class TicketList extends React.Component {

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
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="small">
          <Link to={`/ticket/view/${record.key}`} className="table-column"> View </Link>
        </Space>
      )
    },
  ];

  render() {

    const data = this.props.tickets.map((item) => ({
      key: item._id,
      title: item.title,
      description: item.description,
      owner: item.owner.name,
      assigned_to: item.assigned_to.name,
      status: item.status
    }));

    return (
      <div className="content-container">
        <h2 className="welcome-message">Welcome, {this.props.username}</h2>
        <h1>All Tickets</h1>
        <Table columns={this.columns} dataSource={data} loading={this.props.isLoading} />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.user.user.name,
    isLoading: state.user.isLoading,
    tickets: state.tickets
  }
}

export default connect(mapStateToProps)(TicketList);