import React, { useState } from 'react';
import { Menu } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userApi } from '../user';

const Header = () => {
  const isAuthUser = useSelector(state => state.isAuthUser);
  const dispatch = useDispatch();
  const location = useLocation();
  
  const { pathname } = location
  const splitLocation = pathname.split("/");
  const [current, setCurrent] = useState(splitLocation[1]);

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
    },
  ];

  const logoutMenu = [
    {
      label: "Logout"
    }
  ];

  const onMenuClick = (e) => setCurrent(e.key);

  const handleLogout = () => {
    userApi.logout();
    dispatch({ type: "LOGOUT_SUCCESS" })
    window.location = '/';
  }

  if (!isAuthUser) return null
  return (
    <div>
      {/* Navbar brand name */}
      <div style={{ float: 'left', margin: '16px', fontSize: '24px', fontWeight: 'bold' }}>
        Ticket Manager
      </div>
      {/* Logout button */}
      <div style={{ float: 'right', margin: '16px' }}>
        <button onClick={() => console.log('Logout')}>Logout</button>
      </div>
      <Menu onClick={onMenuClick} selectedKeys={current} mode="horizontal" items={mainMenu} />
    </div>
  )
}

export default Header;

// <div className='navbar-container'>
{/* <div className='navbar-brand'>
        <Link to="/list" className='navbar-title'>Ticket Manager</Link>
      </div> */}
// <div className='navbar-menu'>
// <Menu className="navbar-menu-box" onClick={onMenuClick} selectedKeys={current} mode="horizontal" items={mainMenu} />
// </div>
{/* <div className='navbar-logout'>
        <Menu className="navbar-menu-box"
          onClick={handleLogout}
          selectedKeys={current} items={logoutMenu} />
      </div> */}
    // </div>