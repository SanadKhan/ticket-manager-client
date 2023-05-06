import React from "react";
import { Link } from "react-router-dom";
import { Button, Form, Input, message } from 'antd';
import { connect } from "react-redux";
import { startUserLogin, apiError, apiSuccess } from "./UserAction";

class Login extends React.Component {

  onFinish = (values) => {
    console.log("success", values);
    this.props.dispatch(startUserLogin(values));
  }

  onFinishFailed = (error) => {
    console.log("Error", error);
  }

  componentDidUpdate() {
    if (this.props.apiError) {
      message.error(this.props.apiError);
      this.props.dispatch(apiError(null));  //clear error for next validation
    } else if (this.props.apiSuccess) {
      message.success(this.props.apiSuccess);
      this.props.dispatch(apiSuccess(null));
      this.props.history.push("/list")
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
          {/* <div className="user-item">
              <img className="user-form-image" src="images/loginimage.webp" />
          </div> */}
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
              <Input placeholder="Enter Email Address" />
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
              <Input.Password placeholder="Enter Password" />
            </Form.Item>

            <Form.Item>
              <Button disabled={this.props.isLoading}
                type="primary" htmlType="submit" size="large">
                Submit
              </Button>
              <p className="user-form-account-text"> Don't have an account?
                <Link to="/register"> Register! </Link>
              </p>
            </Form.Item>
          </div>
        </div>
      </Form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    apiError: state.user.error,
    apiSuccess: state.user.success,
    isLoading: state.user.isLoading
  }
}

export default connect(mapStateToProps)(Login);