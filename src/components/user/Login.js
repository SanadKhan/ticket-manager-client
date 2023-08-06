import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Input, message } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { startUserLogin, apiError } from "./UserAction";
import { validateEmail } from "../../utils/helper";

const Login = () => { 
  
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
    dispatch(startUserLogin(values));
  }

  const onFinishFailed = (error) => {
    console.log("Error", error);
  }

  return (
    <Form
      name="basic"
      size="large"
      layout="vertical"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <div className="user-container">
        <div className="user-form">
          <h3 className="user-form-title">Sign in to Ticket Manager</h3>
          <hr className="user-form-hr"></hr>
          <Form.Item
            label="Email Address"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your username!',
              },
              {
                validator: validateEmail
              }
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
            <Button disabled={isLoading}
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

export default Login;


// wth redux

// import React, { useEffect } from "react";
// import { Link } from "react-router-dom";
// import { Button, Form, Input, message } from 'antd';
// import { useDispatch, useSelector } from "react-redux";
// import { startUserLogin, apiError } from "./UserAction";
// import { validateEmail } from "../../utils/helper";

// const Login = () => { 

//   const dispatch = useDispatch();
//   const isApiError = useSelector(state => state.user.error);
//   const isLoading = useSelector(state => state.user.isLoading);

//   useEffect(() => {
//     if (isApiError) {
//       message.error(isApiError);
//       dispatch(apiError(null));  //clear msgs for if else msg
//     }
//   }, [isApiError]);

//   const onFinish = (values) => {
//     dispatch(startUserLogin(values));
//   }

//   const onFinishFailed = (error) => {
//     console.log("Error", error);
//   }

//   return (
//     <Form
//       name="basic"
//       size="large"
//       layout="vertical"
//       onFinish={onFinish}
//       onFinishFailed={onFinishFailed}
//       autoComplete="off"
//     >
//       <div className="user-container">
//         <div className="user-form">
//           <h3 className="user-form-title">Sign in to Ticket Manager</h3>
//           <hr className="user-form-hr"></hr>
//           <Form.Item
//             label="Email Address"
//             name="email"
//             rules={[
//               {
//                 required: true,
//                 message: 'Please input your username!',
//               },
//               {
//                 validator: validateEmail
//               }
//             ]}
//           >
//             <Input placeholder="Enter Email Address" />
//           </Form.Item>

//           <Form.Item
//             label="Password"
//             name="password"
//             rules={[
//               {
//                 required: true,
//                 message: 'Please input your password!',
//               },
//             ]}
//           >
//             <Input.Password placeholder="Enter Password" />
//           </Form.Item>

//           <Form.Item>
//             <Button disabled={isLoading}
//               type="primary" htmlType="submit" size="large">
//               Submit
//             </Button>
//             <p className="user-form-account-text"> Don't have an account?
//               <Link to="/register"> Register! </Link>
//             </p>
//           </Form.Item>
//         </div>
//       </div>
//     </Form>
//   )
// } 

// export default Login;