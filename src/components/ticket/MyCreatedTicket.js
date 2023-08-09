import React, { useState } from "react";
import { Button, Table, Space, message, Popconfirm } from 'antd';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { userApi } from "../user";
import { ticketApi } from ".";

const MyCreatedTicket = () => {
  const perPage = useSelector(state => state.perPage);
  const [page, setPage] = useState(1);
  const [tickets, setTickets] = useState([]);
  const [ticketsCount, setTicketsCount] = useState(5);
  const type = 'created';
  const queryClient = useQueryClient();

  const { data: AllUsers } = useQuery({
    queryKey: ["users"],
    queryFn: userApi.readAll
  });

  const ticketQuery = useQuery({
    queryKey: ["tickets", page, perPage, type],
    queryFn: () => ticketApi.readAllTicket(page, perPage, type),
    onSuccess: data => {
      setTickets(data.ticket);
      setTicketsCount(data.ticketRecords);
    }
  });

  const deleteTicketMutation = useMutation({
    mutationFn: ticketApi.remove,
    onSuccess: data => {
      queryClient.invalidateQueries("tickets")
      message.success("Deleted Successfully!")
    }
  })

  const onDeleteRecord = (id) => {
    deleteTicketMutation.mutate(id);
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
        const ownername = AllUsers && AllUsers.find(({ _id }) => _id === owner)
        return ownername ? ownername.name : "NA"
      }
    },
    {
      title: "Assigned To",
      dataIndex: "assigned_to",
      key: "assigned_to",
      render: (assigned_to) => {
        const assignedname = AllUsers && AllUsers.find(({ _id }) => _id === assigned_to)
        return assignedname ? assignedname.name : "NA"
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
            onConfirm={() => onDeleteRecord(record.key)}
          >
            <span className="table-column table-delete">Delete</span>
          </Popconfirm>
        </Space>
      )
    },
  ];
 
  const data = tickets.map((item) => ({
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
      <Table
        columns={columns}
        dataSource={data}
        loading={ticketQuery.isLoading}
        pagination={{
          pageSize: perPage,
          total: ticketsCount,
          onChange: (page) => {
            setPage(page)
          }
        }}
      />
    </div>
  );
} 

export default MyCreatedTicket;