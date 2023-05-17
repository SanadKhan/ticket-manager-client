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

    const data = this.props.tickets.length ? this.props.tickets.map((item) => ({
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
        <Table columns={this.columns} dataSource={data} loading={this.props.isLoading} />
        {/* <Column className="table-column" title="Title" dataIndex="title" key="title" />
          <Column className="table-column" title="Description" dataIndex="description" key="description" />
          <Column className="table-column" title="Assinged By" dataIndex="owner" key="owner" />
          <Column className="table-column" title="Assinged To" dataIndex="assigned_to" key="asigned_to" />
          <Column className="table-column" title="Status" dataIndex="status" key="status" />
          <Column
            className="table-column"
            title="Action"
            key="action"
            render={() => (
              <Space size="small">
                <Link to="/ticket/view/1" className="table-column"> View </Link>
              </Space>
            )}
          />
        </Table> */}
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