import React, { useState } from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

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
    label: (
      <Link to="/"> Logout</Link>
    ),
    key: 'logout',
  }
];

const Header = () => {
  const [current, setCurrent] = useState('alltickets');
  const onClick = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };
  return (
    <div className='navbar-container'>
      <div className='navbar-brand'>
        <Link to="/" className='navbar-title'>Ticket Manager</Link>
      </div>
      <div className='navbar-menu'>
        <Menu className="navbar-menu-box" onClick={onClick} selectedKeys={[current]} mode="horizontal" items={mainMenu} />
      </div>
      <div className='navbar-logout'>
        <Menu className="navbar-menu-box" onClick={onClick} selectedKeys={[current]} items={logoutMenu} />
      </div>
    </div>
  );
};

export default Header;

