import React from "react";
import { Button, Table, Space, message, Popconfirm } from 'antd';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { startDeleteTicket, startReadAllTicket } from "./TicketAction";
import { apiError, apiSuccess, startReadAllUser } from "../user/UserAction";

class MyCreatedTicket extends React.Component {
  
  componentDidMount() {
    this.props.dispatch(startReadAllTicket());
    this.props.dispatch(startReadAllUser());
  }

  componentDidUpdate() {
    if (this.props.apiSuccess) {
      message.success(this.props.apiSuccess)
      this.props.dispatch(apiSuccess(null))
    }
    if (this.props.apiError) {
      message.success(this.props.apiError)
      this.props.dispatch(apiError(null))
    }
  }

  onDeleteRecord = (id) => {
    this.props.dispatch(startDeleteTicket(id))
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
            <Link to={`/ticket/edit/${record.key}`} className="table-column table-edit"> Edit </Link>
            <Popconfirm
              title="Are you sure?"
              onConfirm={() => this.onDeleteRecord(record.key)}
            >
              <span className="table-column table-delete">Delete</span>
            </Popconfirm>
          </Space>
        )
      },
    ];
   
    const data = this.props.tickets.map((item) => ({
      key: item._id,
      title: item.title,
      description: item.description,
      owner: item.owner,
      assigned_to: item.assigned_to,
      status: item.status
    }));

    return (
      <div className="content-container">
        <h1>My Created Tickets</h1>
        <Button type="primary" htmlType="submit" size="large" >
          <Link to="/ticket/add">Add Ticket</Link>
        </Button>
        <Table columns={columns} dataSource={data} loading={this.props.isLoading} />
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    tickets: state.tickets.filter(ticket => ticket.owner === state.user.user._id),
    isLoading: state.user.isLoading,
    apiSuccess: state.user.success,
    apiError: state.user.error,
    AllUsers: state.user.allUsers
  }
};

export default connect(mapStateToProps)(MyCreatedTicket);