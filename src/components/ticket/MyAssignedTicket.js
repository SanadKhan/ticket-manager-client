import React from "react";
import { Table, Space, message } from 'antd';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { startReadAllTicket, startUpdateTicketStatus } from "./TicketAction";
import { apiError, apiSuccess, startReadAllUser } from "../user/UserAction";
import { ticketStatusOptions } from "../../utils/constant";

class MyAssignedTicket extends React.Component {

  perPage = 5;
  componentDidMount() {
    this.fetchTicketRecords(1);
    this.props.dispatch(startReadAllUser());
  }

  componentDidUpdate() {
    if (this.props.apiSuccess) {
      this.fetchTicketRecords(1);
      message.success(this.props.apiSuccess);
      this.props.dispatch(apiSuccess(null));
    }
    if (this.props.apiError) {
      message.error(this.props.apiError);
      this.props.dispatch(apiError(null));
    }
  }

  fetchTicketRecords = (page) => {
    this.props.dispatch(startReadAllTicket('assigned', page, this.perPage))
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

    const data = this.props.tickets ? this.props.tickets.map((item) => ({
      key: item._id,
      title: item.title,
      description: item.description,
      owner: item.owner,
      assigned_to: item.assigned_to,
      status: item.status
    })) : [];

    return (
      <div className="content-container">
        <h1>Tickets Assigned To Me</h1>
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
    );
  };
};

const mapStateToProps = (state) => {
  return {
    tickets: state.tickets.ticketList,
    userId: state.user.user._id,
    isLoading: state.user.isLoading,
    AllUsers: state.user.allUsers,
    apiSuccess: state.user.success,
    apiError: state.user.error,
    ticketListTotalRecords: state.tickets.ticketListTotalRecords
  }
};

export default connect(mapStateToProps)(MyAssignedTicket);