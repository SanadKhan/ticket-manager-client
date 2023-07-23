import React, { useState } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { startUserLogout } from '../user/UserAction';
import { useDispatch, useSelector } from 'react-redux';

const Header = () => {
  const isAuthUser = useSelector(state => state.user.isAuthUser);
  const dispatch = useDispatch();
  const [current, setCurrent] = useState('alltickets');

  const mainMenu = [
    {
      label: (
        <Link to="/list"> All Tickets </Link>
      ),
      key: 'alltickets',
    },
    {
      label: (
        <Link to="/myassignedtickets"> Assigned Tickets </Link>
      ),
      key: 'myassignedtickets',
    },
    {
      label: (
        <Link to="/mycreatedtickets"> My Tickets </Link>
      ),
      key: 'mycreatedtickets',
    }
  ];

  const logoutMenu = [
    {
      label: "Logout"
    }
  ];

  const onMenuClick = (e) => setCurrent(e.key);
  
  if (!isAuthUser) return null
  return (
    <div className='navbar-container'>
      <div className='navbar-brand'>
        <Link to="/list" className='navbar-title'>Ticket Manager</Link>
      </div>
      <div className='navbar-menu'>
        <Menu className="navbar-menu-box" onClick={onMenuClick} selectedKeys={current} mode="horizontal" items={mainMenu} />
      </div>
      <div className='navbar-logout'>
        <Menu className="navbar-menu-box"
          onClick={() => {
            dispatch(startUserLogout())
            window.location = '/'
          }}
          selectedKeys={current} items={logoutMenu} />
      </div>
    </div>
  )
}

export default Header;

//Without Hooks
// class Header extends React.Component {

//   state = {
//     current: 'alltickets'
//   }

//   mainMenu = [
//     {
//       label: (
//         <Link to="/list"> All Tickets </Link>
//       ),
//       key: 'alltickets',
//     },
//     {
//       label: (
//         <Link to="/myassignedtickets"> Assigned Tickets </Link>
//       ),
//       key: 'myassignedtickets',
//     },
//     {
//       label: (
//         <Link to="/mycreatedtickets"> My Tickets </Link>
//       ),
//       key: 'mycreatedtickets',
//     }
//   ];

//   logoutMenu = [
//     {
//       label: "Logout"
//     }
//   ];

//   onMenuClick = (e) => {
//     const current = e.key
//     this.setState(() => ({ current }))
//   }

//   render() {

//     if (!this.props.isAuthUser) return null
//     return (
//       <div className='navbar-container'>
//         <div className='navbar-brand'>
//           <Link to="/list" className='navbar-title'>Ticket Manager</Link>
//         </div>
//         <div className='navbar-menu'>
//           <Menu className="navbar-menu-box" onClick={this.onMenuClick} selectedKeys={this.state.current} mode="horizontal" items={this.mainMenu} />
//         </div>
//         <div className='navbar-logout'>
//           <Menu className="navbar-menu-box"
//             onClick={() => {
//               this.props.dispatch(startUserLogout())
//               window.location = '/'
//             }}
//             selectedKeys={this.state.current} items={this.logoutMenu} />
//         </div>
//       </div>
//     )
//   }
// }

// const mapStateToProps = (state) => {
//   return {
//     isAuthUser: state.user.isAuthUser
//   }
// };

// export default connect(mapStateToProps)(Header);



