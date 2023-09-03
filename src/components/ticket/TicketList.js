import React, { useState } from "react";
import { Table, Space } from 'antd';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import { userApi } from "../user";
import { ticketApi } from ".";

const TicketList = () => {
  const username = useSelector(state => state.user.name);
  const perPage = useSelector(state => state.perPage);
  const [page, setPage] = useState(1);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const type = 'all';

  const { data: AllUsers } = useQuery({
    queryKey: ["users"],
    queryFn: userApi.readAll
  });

  const { isLoading, isError, error } = useQuery({
    queryKey: ["tickets",page, perPage, type],
    queryFn: () => ticketApi.readAllTicket(page, perPage, type),
    onSuccess: (values) => {
      setData(values.ticket.map((item) => ({
        key: item._id,
        title: item.title,
        description: item.description,
        owner: item.owner,
        assigned_to: item.assigned_to,
        status: item.status
      })));
      setTotal(values.ticketRecords);
    }
  });

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    if (!error.response.data.msgText) return <span>Error: {error.message}</span>
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
          total,
          onChange: (page) => {
            setPage(page)
          }
        }}
      />
    </div>
  )
}

export default TicketList;