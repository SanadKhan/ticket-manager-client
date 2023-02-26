import React from "react";
import { Link } from "react-router-dom";
import { Button, Form, Input, Select, Space, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

const onFinish = (values) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const fileProps = {
  name: 'ticket-image',
  accept: 'image/*',
  multiple: true,
  listType: "picture",
  // onChange(info) {
  //   if (info.file.status !== 'uploading') {
  //     console.log(info.file, info.fileList);
  //   }
  //   if (info.file.status === 'done') {
  //     message.success(`${info.file.name} file uploaded successfully`);
  //   } else if (info.file.status === 'error') {
  //     message.error(`${info.file.name} file upload failed.`);
  //   }
  // },
  beforeUpload: () => {
    return false
  }
}

const TicketForm = () => (
  <div className="user-container">
      <div className="user-item user-form-ticket">
        <Form
          size="large"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
        <p style={{ fontSize: 24}}>Add Ticket</p>
        <Form.Item
          label="Title"
          name="title"
          rules={[
            {
              required: true,
              message: 'Please input your title!',
            },
            {
              validator: (_,value) => {
                if(value){
                  if(value.length >= 3) {
                    return Promise.resolve();
                  }
                } 
                return Promise.reject(
                  new Error("Must be atleast three chars")
                )
              },
            }
          ]}
        >
          <Input placeholder="Enter Title"/>
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
              validator: (_,value) => {
                if(value){
                  if(value.length >= 3) {
                    return Promise.resolve();
                  }
                } 
                return Promise.reject(
                  new Error("Must be atleast three chars")
                )
              },
            }
          ]}
        >
          <TextArea rows={10}/>
        </Form.Item>
        
        <Form.Item
          label="Assgined To" 
          >
          <Select name="assignedto" onChange={handleChange}>
            <Select.Option value="andrew">Andrew</Select.Option>
          </Select>
          {/* <Space wrap>
            <Select
              defaultValue="lucy"
              style={{
                width: 120,
              }}
              onChange={handleChange}
              options={[
                {
                  value: 'jack',
                  label: 'Jack',
                },
                {
                  value: 'lucy',
                  label: 'Lucy',
                },
                {
                  value: 'Yiminghe',
                  label: 'yiminghe',
                }
              ]}
            />
          </Space> */}
        </Form.Item>
        <Form.Item 
          label="Ticket Image">
        <Upload {...fileProps}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
        </Form>
    </div>
  </div>
);

export default TicketForm;