import React, { useEffect } from "react";
import { Button, Table, Space, message, Popconfirm } from 'antd';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { startDeleteTicket, startReadAllTicket } from "./TicketAction";
import { apiError, apiSuccess, startReadAllUser } from "../user/UserAction";

const MyCreatedTicket = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.user.isLoading);
  const tickets = useSelector(state => state.tickets.ticketList);
  const AllUsers = useSelector(state => state.user.allUsers);
  const isApiSuccess = useSelector(state => state.user.success);
  const isApiError = useSelector(state => state.user.error);
  const ticketListTotalRecords = useSelector(state => state.tickets.ticketListTotalRecords);
  const perPage = useSelector(state => state.tickets.perPage);

  useEffect(() => {
    fetchTicketRecords(1);
    dispatch(startReadAllUser());
  }, []);

  useEffect(() => {
    if (isApiSuccess) {
      message.success(isApiSuccess);
      dispatch(apiSuccess(null));
    }
    if (isApiError) {
      message.error(isApiError);
      dispatch(apiError(null));
    }
  }, [isApiSuccess, isApiError]);

  const fetchTicketRecords = (page) => {
    dispatch(startReadAllTicket('created', page, perPage))
  }

  const onDeleteRecord = (id) => {
    dispatch(startDeleteTicket(id))
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
 
  const data = tickets ? tickets.map((item) => ({
    key: item._id,
    title: item.title,
    description: item.description,
    owner: item.owner,
    assigned_to: item.assigned_to,
    status: item.status
  })): [];

  return (
    <div className="content-container">
      <h1>My Created Tickets</h1>
      <Button type="primary" htmlType="submit" size="large" >
        <Link to="/ticket/add">Add Ticket</Link>
      </Button>
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
  );
} 

export default MyCreatedTicket;