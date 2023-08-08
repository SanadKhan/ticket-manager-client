import React, { useState } from "react";
import { Table, Space, message } from 'antd';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { startReadAllTicket, startUpdateTicketStatus } from "./TicketAction";
import { apiError, apiSuccess, startReadAllUser } from "../user/UserAction";
import { ticketStatusOptions } from "../../utils/constant";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { userApi } from "../user";
import { ticketApi } from ".";

const MyAssignedTicket = () => {
  const dispatch = useDispatch();
  const perPage = useSelector(state => state.perPage);
  const [page, setPage] = useState(1);
  const [tickets, setTickets] = useState([]);
  const [ticketsCount, setTicketsCount] = useState(5);
  const type = 'assigned';
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

  const updateTicketStatusMutation = useMutation({
    mutationFn: ticketApi.updateTicketStatus,
    onSuccess: data => {
      queryClient.invalidateQueries("tickets")
      message.success("Updated Successfully!")
    }
  }) 

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
        const ownername = AllUsers && AllUsers.find(({ _id }) => _id === assigned_to)
        return ownername ? ownername.name : "NA"
      }
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <div>
          {record.status === 'Completed' ? record.status :
            <select style={{ padding: "7px" }} name="status" defaultValue={record.status}
              onChange={(e) => {
                const data = { status: e.target.value }
                updateTicketStatusMutation.mutate(data, record.key)
              }}>
              {ticketStatusOptions.map((status) =>
                <option key={ status.id } value={status.id}>{status.value}</option>
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
      <h1>Tickets Assigned To Me</h1>
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

export default MyAssignedTicket;