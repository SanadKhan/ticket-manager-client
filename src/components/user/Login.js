import React from "react";
import { Link } from "react-router-dom";
import { Form, Icon, Input, Button, Checkbox } from 'antd';

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} >
        <div className="user-container">
          <div className="user-item">
              <img className="user-form-image" src="images/loginimage.webp" /> 
          </div>
          <div className="user-item user-form-login">
              <h3 className="user-form-title">Sign in to Ticket Manager</h3>
              <hr className="user-form-hr"></hr>
              <Form.Item label="Email address">
              {getFieldDecorator('email', {
                  rules: [
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },
                    { 
                      required: true, 
                      message: 'Please input your username!' 
                    }
                  ],
              })(
                  <Input
                  className="input-field"
                  placeholder="Enter valid email address"
                  />,
              )}
              </Form.Item>
              <Form.Item label="Password">
              {getFieldDecorator('password', {
                  rules: [{ required: true, message: 'Please input your Password!' }],
              })(
                  <Input.Password
                  // prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type="password"
                  className="input-field"
                  placeholder="Enter password"
                  />,
              )}
              </Form.Item>
              <Form.Item>
              <Button type="primary" htmlType="submit" size="large">
                  Log in
              </Button>
              <p className="user-form-account-text"> Don't have an account? 
                <Link to="/register"> Register! </Link> 
              </p>
              </Form.Item> 
          </div>
        </div>
      </Form>
    );
  }
}

const Login = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default Login;