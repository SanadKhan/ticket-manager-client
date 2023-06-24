import React from "react";
import { Link } from "react-router-dom";
import { Button, Form, Input, Select, Upload, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { apiError, startReadAllUser } from "../user/UserAction";
import { connect } from "react-redux";
import { ticketStatusOptions } from "../../utils/constant";
import { textFieldValidator } from "../../utils/helper";

class TicketForm extends React.Component {

  componentDidMount() {
    this.props.dispatch(startReadAllUser())
  }

  componentDidUpdate() {
    if (this.props.apiError) {
      message.error(this.props.apiError)
      this.props.dispatch(apiError(null))
    }
  }

  state = {
    fileList: this.props.ticketFiles ? this.props.ticketFiles.map((file) => {
      return {
        ...file,
        status: 'done'
      }
    } ) : [],
    deleteFiles: []
  };

  initialValues = {
    title: this.props.ticket ? this.props.ticket.title : '',
    description: this.props.ticket ? this.props.ticket.description : '',
    assigned_to: this.props.ticket ? this.props.ticket.assigned_to : this.props.userId,
    status: this.props.ticket ? this.props.ticket.status : 'Pending'
  }

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  render() {

    const fileProps = {
      accept: 'image/*',
      multiple: true,
      listType: "picture",
      maxCount: 2,
      fileList: this.state.fileList,
      beforeUpload: (file) => {
        if (!file.size > 2 * 1024 * 1024) {
          message.error(`${file.name} must smaller than 2MB!`);
          return Upload.LIST_IGNORE;
        }
        return false;
      },
      onChange: ({ fileList: newFileList }) => {
        this.setState({ fileList: newFileList })
      },
      onRemove: (file) => {
        if (file.fileId) {
          const newArray = this.state.deleteFiles.slice(); // Create a copy of the array
          newArray.push(file.fileId); // Push the new value into the copied array
          this.setState({ deleteFiles : newArray }); // Update the state with the new array
        }
      }
    }

    const onFinish = (values) => {

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("owner", this.props.userId);
      formData.append("assigned_to", values.assigned_to);
      formData.append("status", values.status);
      if (this.state.fileList) {
        this.state.fileList.forEach(file => {
          if (file.originFileObj) formData.append("ticket_files", file.originFileObj);
        });
      }
      if (this.state.deleteFiles) {
        this.state.deleteFiles.forEach(file => formData.append("deleted_img[]", file));
      }
      this.props.OnSubmit(formData);
    };

    return (
      <Form
        size="large"
        layout="vertical"
        initialValues={this.initialValues}
        onFinish={onFinish}
        onFinishFailed={this.onFinishFailed}
        autoComplete="off"
      >
        <div className="user-container">
          <div className="user-form-ticket">
            <p style={{ fontSize: 24 }}>{this.props.title}</p>
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
                {this.props.userOptions && this.props.userOptions.map((user) =>
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

              <Button disabled={this.props.isLoading}
                type="primary" htmlType="submit">
                Save
              </Button>
            </Form.Item>
          </div>
        </div>
      </Form>

    );
  };
};

const mapStateToProps = (state) => {
  return {
    userId: state.user.user._id,
    userOptions: state.user.allUsers,
    isLoading: state.user.isLoading,
    apiError: state.user.error
  }
}

export default connect(mapStateToProps)(TicketForm);