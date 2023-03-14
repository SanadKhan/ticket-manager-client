import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Input } from 'antd';
import { startAddUser } from "./UserAction";
// import { Connect } from "react-redux";
import { connect } from "react-redux";

// const onFinish = (values) => {
//   console.log('Success:', values);

// };

// const onFinishFailed = (errorInfo) => {
//   console.log('Failed:', errorInfo);
// };

class Register extends React.Component {
// const Register = (props) => {
  state = {
    name: '',
    email: '',
    password: '',
  }

  onNameChange = (e) => {
    const name = e.target.value;
    this.setState(() => ({ name }));
  }

  onEmailChange = (e) => {
    const email = e.target.value;
    this.setState(() => ({ email }));
  }

  onPasswordChange = (e) => {
    const password = e.target.value;
    this.setState(() => ({ password }));
  }
  // const [name, setName] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');

  onFinish = (values) => {
    // e.preventDefault();
    const user = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password
    };

    console.log("success", this.props);
    this.props.dispatch(startAddUser(user));
    this.props.history.push('/list');
  }; 

  onFinishFailed = (err) => {
    console.log("Failed", err);
  };

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
          <div className="user-item">
              <img className="user-form-image" src="images/loginimage.webp" /> 
          </div>
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
              <Input placeholder="Enter Name" onChange={this.onNameChange}/>
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
              <Input placeholder="Enter Email" onChange={this.onEmailChange}/>
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
                    if(value){
                      if(value.length >= 3) {
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
              <Input.Password placeholder="Enter Password" onChange={this.onPasswordChange}/>
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

// const mapStateToProps = (state) => {
//   return {
//     expenses: state.expenses
//   }
// };

export default connect()(Register);