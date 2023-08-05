import React, { useEffect } from "react";
import { Table, Space } from 'antd';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { startReadAllTicket } from "./TicketAction";
import { startReadAllUser } from "../user/UserAction";

const TicketList = () => {
  const dispatch = useDispatch();
  const username = useSelector(state => state.user.user.name);
  const isLoading = useSelector(state => state.user.isLoading);
  const tickets = useSelector(state => state.tickets.ticketList);
  const AllUsers = useSelector(state => state.user.allUsers);
  const ticketListTotalRecords = useSelector(state => state.tickets.ticketListTotalRecords);
  const perPage = useSelector(state => state.tickets.perPage);

  useEffect(() => {
    fetchTicketRecords(1);
    dispatch(startReadAllUser());
  }, []);

  const fetchTicketRecords = (page) => {
    dispatch(startReadAllTicket('all', page, perPage))
  }

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
        const ownername = AllUsers && AllUsers.find(({ _id }) => _id === owner)
        return ownername ? ownername.name : "NA"
      }
    },
    {
      title: "Assigned To",
      dataIndex: "assigned_to",
      key: "assigned_to",
      render: (assigned_to) => {
        const ownername = AllUsers && AllUsers.find(({ _id }) => _id === assigned_to)
        return ownername ? ownername.name : "NA"
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

  const data = tickets ?  tickets.map((item) => ({
    key: item._id,
    title: item.title,
    description: item.description,
    owner: item.owner,
    assigned_to: item.assigned_to,
    status: item.status
  })) : [];

  return (
    <div className="content-container">
      <h2 className="welcome-message">Welcome, {username}</h2>
      <h1>All Tickets</h1>
      <Table
        columns={columns}
        dataSource={data}
        loading={isLoading}
        pagination={{ 
          pageSize: perPage,
          total: ticketListTotalRecords,
          onChange: (page) => {
            fetchTicketRecords(page)
          }
        }}
      />
    </div>
  )
}

export default TicketList;