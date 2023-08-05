import React, { useEffect } from "react";
import { Table, Space, message } from 'antd';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { startReadAllTicket, startUpdateTicketStatus } from "./TicketAction";
import { apiError, apiSuccess, startReadAllUser } from "../user/UserAction";
import { ticketStatusOptions } from "../../utils/constant";

const MyAssignedTicket = () => {
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
    dispatch(startReadAllTicket('assigned', page, perPage))
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
                dispatch(startUpdateTicketStatus(data, record.key))
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

  const data = tickets ? tickets.map((item) => ({
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

export default MyAssignedTicket;