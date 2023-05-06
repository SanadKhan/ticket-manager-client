import React from "react";
import { Link } from "react-router-dom";
import { Button, Form, Input } from 'antd';
import { startAddUser } from "./UserAction";
import { connect } from "react-redux";

const Register = (props) => {

  const onFinish = (values) => {
    console.log("On Submit Values", values);
    props.dispatch(startAddUser(values));
    props.history.push('/list');
  };

  const onFinishFailed = (err) => {
    console.log("Failed", err);
  };

  return (
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
        {/* <div className="user-item">
              <img className="user-form-image" src="images/loginimage.webp" /> 
          </div> */}
        <div className="user-item user-form-register">
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
                validator: (_, value) => {
                  if (value) {
                    if (value.length >= 3) {
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
            <Input placeholder="Enter Name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                type: 'email',
                message: 'The input is not valid E-mail!'
              },
              {
                required: true,
                message: 'Please input your email!',
              },
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
                validator: (_, value) => {
                  if (value) {
                    if (value.length >= 3) {
                      return Promise.resolve();
                    }
                  }
                  return Promise.reject(
                    new Error("Must be atleast three chars")
                  )
                }
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

export default connect()(Register);