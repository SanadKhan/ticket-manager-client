import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Input, message } from 'antd';
import { apiError, startAddUser } from "./UserAction";
import { useDispatch, useSelector } from "react-redux";
import { passwordValidator, textFieldValidator, validateEmail } from "../../utils/helper";

const Register = () => {

  const dispatch = useDispatch();
  const isApiError = useSelector(state => state.user.error);
  const isLoading = useSelector(state => state.user.isLoading);

  useEffect(() => {
    if (isApiError) {
      message.error(isApiError);
      dispatch(apiError(null));  //clear msgs for if else msg
    }
  }, [isApiError]);

  const onFinish = (values) => {
    dispatch(startAddUser(values));
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
            <Button disabled={isLoading} type="primary" htmlType="submit" size="large">
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

export default Register;
