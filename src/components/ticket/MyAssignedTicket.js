import React from "react";
import { Table, Space, Form, Select, message } from 'antd';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { startReadAllTicket, startUpdateTicketStatus } from "./TicketAction";
import { apiError, apiSuccess, startReadAllUser } from "../user/UserAction";
import { ticketStatusOptions } from "../../utils/constant";

class MyAssignedTicket extends React.Component {

  componentDidMount() {
    this.props.dispatch(startReadAllTicket());
    this.props.dispatch(startReadAllUser());
  }

  componentDidUpdate() {
    if (this.props.apiSuccess) {
      this.props.dispatch(startReadAllTicket());
      message.success(this.props.apiSuccess);
      this.props.dispatch(apiSuccess(null));
    }
    if (this.props.apiError) {
      message.error(this.props.apiError);
      this.props.dispatch(apiError(null));
    }
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
        key: "status",
        render: (text, record) => (
          <div>
            {record.status === 'Completed' ? record.status :
              <select style={{ padding: "7px" }} name="status" value={record.status} onChange={(e) => {
                const data = { status: e.target.value }
                this.props.dispatch(startUpdateTicketStatus(data, record.key))
              }}>
                {ticketStatusOptions.map((status) =>
                  <option value={status.id}>{status.value}</option>
                )}
              </select>
            }
          </div>
        )
      }
      ,
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
        <h1>Tickets Assigned To Me</h1>
        <Table columns={columns} dataSource={data} loading={this.props.isLoading} />
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    tickets: state.tickets.filter((ticket) => ticket.assigned_to === state.user.user._id),
    isLoading: state.user.isLoading,
    AllUsers: state.user.allUsers,
    apiSuccess: state.user.success,
    apiError: state.user.error,
  }
};

export default connect(mapStateToProps)(MyAssignedTicket);