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
        <Link to="/list"> Ticket Manager </Link>
      ),
      key: 'brand',
      className:'navbar-title'
    },
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
    {
      label: "Logout",
      key: 'logout',
      onClick: () => {
        userApi.logout();
        dispatch({ type: "LOGOUT_SUCCESS" })
        window.location = '/';
      },
      className:'navbar-logout'
    },
  ];

  const onMenuClick = (e) => setCurrent(e.key);

  if (!isAuthUser) return null
  return (
    <Menu style={{ fontSize: '16px' }} onClick={onMenuClick} selectedKeys={current} mode="horizontal" items={mainMenu} />
  )
}

export default Header;