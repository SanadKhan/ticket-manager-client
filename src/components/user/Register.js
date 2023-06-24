import React from "react";
import { Link } from "react-router-dom";
import { Button, Form, Input, message } from 'antd';
import { apiError, startAddUser } from "./UserAction";
import { connect } from "react-redux";
import { passwordValidator, textFieldValidator, validateEmail } from "../../utils/helper";

class Register extends React.Component {

  onFinish = (values) => {
    this.props.dispatch(startAddUser(values));
  };

  onFinishFailed = (err) => {
    console.log("Failed", err);
  };

  componentDidUpdate() {
    if (this.props.apiError) {
      message.error(this.props.apiError)
      this.props.dispatch(apiError(null))
    }
  }

  render() {

    return (
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        size="large"
        layout="vertical"
        onFinish={this.onFinish}
        onFinishFailed={this.onFinishFailed}
        autoComplete="off"
      >
        <div className="user-container">
          <div className="user-form">
            <h3 className="user-form-title">Sign up to Ticket Manager</h3>
            <hr className="user-form-hr"></hr>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input your name!',
                },
                {
                  validator: textFieldValidator
                }
              ]}
            >
              <Input placeholder="Enter Name" />
            </Form.Item>
  
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
                {
                  validator: validateEmail
                }
              ]}
            >
              <Input placeholder="Enter Email" />
            </Form.Item>
  
            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your password!',
                },
                {
                  validator: passwordValidator
                }
              ]}
            >
              <Input.Password placeholder="Enter Password" />
            </Form.Item>
  
            <Form.Item>
              <Button type="primary" htmlType="submit" size="large">
                Submit
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

const mapStateToProps = (state) => {
  return {
    apiError: state.user.error,
    apiSuccess: state.user.success,
    isLoading: state.user.isLoading
  }
}

export default connect(mapStateToProps)(Register);