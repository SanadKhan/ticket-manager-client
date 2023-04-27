import React from "react";
import { Link } from "react-router-dom";
import { Button, Form, Input } from 'antd';
import { startAddUser } from "./UserAction";
import { connect } from "react-redux";

class Register extends React.Component {

  onClickTest = () => {
    console.log("Clicked!", this.props);
    // onClicked = () => {
    //   console.log('Im onClicked!');
    // }
    // this.onClicked();
  }

  onFinish = (values) => {
    // e.preventDefault();
    // this.onClickTest();
    console.log("On Submit Values", values);
    console.log("Redux Store inside onfinish", this.props);
    this.props.dispatch(startAddUser(values));
    this.props.history.push('/list');
  }; 

  onFinishFailed = (err) => {
    console.log("Failed", err);
  };
  
  render() {
    console.log("redux store ", this.props)
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