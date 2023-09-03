import React, { useState } from "react";
import { Table, Space, message } from 'antd';
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { ticketStatusOptions } from "../../utils/constant";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { userApi } from "../user";
import { ticketApi } from ".";

const MyAssignedTicket = () => {
  const perPage = useSelector(state => state.perPage);
  const [page, setPage] = useState(1);
  const type = 'assigned';
  const queryClient = useQueryClient();

  const { data: AllUsers } = useQuery({
    queryKey: ["users"],
    queryFn: userApi.readAll
  });

  const { data: ticketQuery, isLoading, isError, error } = useQuery({
    queryKey: ["tickets",page, perPage, type],
    queryFn: () => ticketApi.readAllTicket(page, perPage, type),
  });

  const updateTicketStatusMutation = useMutation({
    mutationFn: ticketApi.updateTicketStatus,
    onSuccess: () => {
      queryClient.invalidateQueries("tickets")
    }
  });

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
      return <span>Error: {error.message}</span>
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
                updateTicketStatusMutation.mutate({ ticketData: data, ticketId: record.key }, {
                  onSuccess: () => {
                    message.success("Updated Successfully!")
                  }
                })
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

  const data = ticketQuery.ticket.map((item) => ({
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
        loading={isLoading}
        pagination={{
          pageSize: perPage,
          total: ticketQuery.ticketRecords,
          onChange: (page) => {
            setPage(page)
          }
        }}
      />
    </div>
  );
}

export default MyAssignedTicket;