import React from "react";
import { Table, Space } from 'antd';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { startReadAllTicket } from "./TicketAction";
import { startReadAllUser } from "../user/UserAction";

class TicketList extends React.Component {

  perPage = 5;
  componentDidMount() {
    // this.props.dispatch(startReadAllTicket());
    this.fetchTicketRecords(1);
    this.props.dispatch(startReadAllUser());
    console.log("mounted tciket count", this.props)
  }

  fetchTicketRecords = (page) => {
    this.props.dispatch(startReadAllTicket(page,this.perPage))
  }

  render() {

    const columns = [
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
        key: "title"
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description"
      },
      {
        title: "Assigned By",
        dataIndex: "owner",
        key: "owner",
        render: (owner) => {
          const ownername = this.props.AllUsers && this.props.AllUsers.find(({ _id }) => _id === owner)
          return ownername.name || "NA"
        }
      },
      {
        title: "Assigned To",
        dataIndex: "assigned_to",
        key: "assigned_to",
        render: (assigned_to) => {
          const ownername = this.props.AllUsers && this.props.AllUsers.find(({ _id }) => _id === assigned_to)
          return ownername.name || "NA"
        }
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

    const data = this.props.tickets ?  this.props.tickets.map((item) => ({
      key: item._id,
      title: item.title,
      description: item.description,
      owner: item.owner,
      assigned_to: item.assigned_to,
      status: item.status
    })) : [];

    return (
      <div className="content-container">
        <h2 className="welcome-message">Welcome, {this.props.username}</h2>
        <h1>All Tickets</h1>
        <Table
          columns={columns}
          dataSource={data}
          loading={this.props.isLoading}
          pagination={{ 
            pageSize: this.perPage,
            total: this.props.ticketListTotalRecords,
            onChange: (page) => {
              this.fetchTicketRecords(page)
            }
          }}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    username: state.user.user.name,
    isLoading: state.user.isLoading,
    tickets: state.tickets.ticketList,
    AllUsers: state.user.allUsers,
    ticketListTotalRecords: state.tickets.ticketListTotalRecords
  }
}

export default connect(mapStateToProps)(TicketList);