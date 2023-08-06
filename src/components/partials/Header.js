import React, { useState } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userApi } from '../user';

const Header = () => {
  const isAuthUser = useSelector(state => state.isAuthUser);
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

  const handleLogout = () => {
    userApi.logout();
    dispatch({ type: "LOGOUT_SUCCESS" })
    window.location = '/';
  }
  
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
          onClick={handleLogout}
          selectedKeys={current} items={logoutMenu} />
      </div>
    </div>
  )
}

export default Header;