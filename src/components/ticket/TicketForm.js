import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Input, Select, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useSelector } from "react-redux";
import { ticketStatusOptions } from "../../utils/constant";
import { textFieldValidator } from "../../utils/helper";
import { useQuery } from "react-query";
import { userApi } from "../user";

const TicketForm = ({ title, OnSubmit, ticket, ticketFiles }) => {

  const [ fileList, setFileList ] = useState([]);
  const [ deleteFiles, setDeleteFiles ] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const userId = useSelector(state => state.user._id);
  
  const { data: userOptions } = useQuery({
    queryKey: ["users"],
    queryFn: userApi.readAll
  });

  useEffect(() => {
    if (ticketFiles && ticketFiles.length) {
      const files = ticketFiles.map((file) => {
        return {
          ...file,
          status: 'done'
        }
      });
      setFileList(files);
    }
  }, []);

  const initialValues = {
    title: ticket ? ticket.title : '',
    description: ticket ? ticket.description : '',
    assigned_to: ticket ? ticket.assigned_to : userId,
    status: ticket ? ticket.status : 'Completed'
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const fileProps = {
    accept: 'image/*',
    multiple: true,
    listType: "picture",
    maxCount: 2,
    fileList ,
    beforeUpload: (file) => {
      if (!file.size > 2 * 1024 * 1024) {
        message.error(`${file.name} must smaller than 2MB!`);
        return Upload.LIST_IGNORE;
      }
      return false;
    },
    onChange: ({ fileList: newFileList }) => {
      setFileList(newFileList)
    },
    onRemove: (file) => {
      if (file.fileId) {
        setDeleteFiles((current) => [...current, file.fileId]);
      }
    }
  }

  const onFinish = (values) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("owner", userId);
    formData.append("assigned_to", values.assigned_to);
    formData.append("status", values.status);
    if (fileList) {
      fileList.forEach(file => {
        if (file.originFileObj) formData.append("ticket_files", file.originFileObj);
      });
    }
    if (deleteFiles) {
      deleteFiles.forEach(file => formData.append("deleted_img[]", file));
    }
    OnSubmit(formData);
    setIsLoading(false)
  };

  return (
    <Form
      size="large"
      layout="vertical"
      initialValues={initialValues}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <div className="user-container">
        <div className="user-form-ticket">
          <p style={{ fontSize: 24 }}>{title}</p>
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: 'Please input your title!',
              },
              {
                validator: textFieldValidator
              }
            ]}
          >
            <Input placeholder="Enter Title" />
          </Form.Item>

          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: 'Please input your description!',
              },
              {
                validator: textFieldValidator
              }
            ]}
          >
            <Input.TextArea rows={10} />
          </Form.Item>

          <Form.Item
            label="Assigned To"
            name="assigned_to"
          >
            <Select placeholder="Select Option">
              {userOptions && userOptions.map((user) =>
                <Select.Option key={user._id} value={user._id}>{user.name}</Select.Option>
              )}
            </Select>
          </Form.Item>
          <Form.Item
            label="Status"
            name="status"
          >
            <Select placeholder="Select Option">
              {ticketStatusOptions.map((status) =>
                <Select.Option key={status.id} value={status.id}>{status.value}</Select.Option>
              )}
            </Select>
          </Form.Item>
          <Form.Item
            label="Ticket Image">
            <Upload {...fileProps}>
              <Button icon={<UploadOutlined />}>Click to Upload (Max: 2)</Button>
            </Upload>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="default">
              <Link to={`/mycreatedtickets`} >Cancel </Link>
            </Button> &nbsp; &nbsp;

            <Button disabled={isLoading}
              type="primary" htmlType="submit">
              Save
            </Button>
          </Form.Item>
        </div>
      </div>
    </Form>
  );

}

export default TicketForm;
