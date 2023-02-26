import React from "react";
import { Link } from "react-router-dom";
import { Button, Form, Input } from 'antd';

const onFinish = (values) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const Login = () => (
  <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    size="large"
    layout="vertical"
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
  >
    <div className="user-container">
      <div className="user-item">
          <img className="user-form-image" src="images/loginimage.webp" /> 
      </div>
      <div className="user-item user-form-login">
        <h3 className="user-form-title">Sign in to Ticket Manager</h3>
        <hr className="user-form-hr"></hr>
        <Form.Item
          label="Email Address" 
          name="email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!'
            },
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input placeholder="Enter Email Address"/>
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password  placeholder="Enter Password"/>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" size="large">
            Submit
          </Button>
          <p className="user-form-account-text"> Don't have an account? 
            <Link to="/register"> Register! </Link> 
          </p>
        </Form.Item>
      </div>
    </div>
  </Form>
);

export default Login;