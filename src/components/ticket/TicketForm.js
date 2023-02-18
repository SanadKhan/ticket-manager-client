import React from "react";
import { Link } from "react-router-dom";
import { UploadOutlined } from '@ant-design/icons';
import {
    Form,
    Input,
    Tooltip,
    Icon,
    Cascader,
    Select,
    Row,
    Col,
    Checkbox,
    Button,
    AutoComplete,
    Upload,
    message
  } from 'antd';

const props = {
  accept: "image/*",
  name: 'ticket-image',
  multiple: true,
  // action: 'http://localhost:8080/ticket/add',
  // headers: {
  //   authorization: 'authorization-text',
  // },
  listType: "picture",
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};
  
const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;
const { TextArea } = Input;

class TicketsForm extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleWebsiteChange = value => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;


  //   const websiteOptions = autoCompleteResult.map(website => (
  //     <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
  //   ));

    return (
      <Form onSubmit={this.handleSubmit} autoComplete="off">
          <div className="user-container">
              <div className="user-item user-form-register">
                  <h3 className="user-form-title">Add Ticket</h3>
                  <Form.Item label="Title" name="title">
                      
                    <Input 
                    className="input-field"
                    placeholder="Enter Title"/>
                   
                  </Form.Item>
                  
                  <Form.Item label="Description" name="descp">
                      <TextArea rows={7} />
                  </Form.Item>

                  <Form.Item label="Assigned To">
                    <Select size="large" name="assignedto">
                      <Option value="andrew">Andrew</Option>
                      <Option value="jess">Jess</Option>
                      <Option value="jen">Jen</Option>
                    </Select>
                  </Form.Item>
                  
                  <Form.Item label="Ticket Image">
                    <Upload {...props}>
                      <Button size="large" icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                  </Form.Item>

                  <Form.Item >
                      <Button type="primary" htmlType="submit" size="large">
                      Save
                      </Button>
                  </Form.Item>
              </div>
          </div>
      </Form>
    );
  }
}
  
const TicketForm = Form.create({ name: 'ticket' })(TicketsForm);
  
// const TicketForm = () => (
//     <div>
//         <h1>Ticket Form</h1>
//     </div>
// );

export default TicketForm;