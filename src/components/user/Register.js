import React from "react";
import { Link } from "react-router-dom";
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
  } from 'antd';
  
  const { Option } = Select;
  const AutoCompleteOption = AutoComplete.Option;
  
  class RegistrationForm extends React.Component {
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
        <Form onSubmit={this.handleSubmit}>
            <div className="user-container">
                <div className="user-item">
                    <img className="user-form-image" src="images/loginimage.webp" /> 
                </div>
                <div className="user-item user-form-register">
                    <h3 className="user-form-title">Sign up to Ticket Manager</h3>
                    <hr className="user-form-hr"></hr>
                    <Form.Item label="Name">
                        {getFieldDecorator('name', {
                        rules: [{ required: true, message: 'Please input your name!', whitespace: true }],
                        })(<Input 
                          className="input-field"
                          placeholder="Enter Name"/>)}
                    </Form.Item>
                   
                    <Form.Item label="E-mail">
                        {getFieldDecorator('email', {
                        rules: [
                            {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                            },
                            {
                            required: true,
                            message: 'Please input your E-mail!',
                            },
                        ],
                        })(<Input 
                          className="input-field"
                          placeholder="Enter valid email address"
                          />)}
                    </Form.Item>
                    <Form.Item label="Password" >
                        {getFieldDecorator('password', {
                        rules: [
                            {
                            required: true,
                            message: 'Please input your password!',
                            }
                        ],
                        })(<Input.Password 
                        className="input-field"
                        placeholder="Enter password"/>)}
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" htmlType="submit" size="large">
                        Register
                        </Button>
                        <p className="user-form-account-text"> Already have an account? 
                            <Link to="/"> Login! </Link> 
                        </p>
                    </Form.Item>
                </div>
            </div>
        </Form>
      );
    }
  }
  
const Register = Form.create({ name: 'register' })(RegistrationForm);
  
export default Register;