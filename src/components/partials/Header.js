import React from 'react';
import { Menu } from 'antd';
import { Link } from 'react-router-dom';

class Header extends React.Component {
  state = {
    current: 'alltickets',
  };

  handleClick = e => {
    console.log('click ', e);
    this.setState({
      current: e.key,
    });
  };

  render() {
    return (
      <div className='navbar-container'>
        <div className='navbar-brand'>
          <Link to="/" className='navbar-title'>Ticket Manager</Link>
        </div>
        <div className='navbar-menu'>
          <Menu className="navbar-menu-box" onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
            <Menu.Item key="alltickets">
              <Link to="/list"> All Tickets </Link>
            </Menu.Item>
            <Menu.Item key="myassignedticket">
              <Link to="/myassignedtickets"> Assigned Tickets </Link>
            </Menu.Item>
            <Menu.Item key="mycreatedticket">
              <Link to="/mycreatedtickets"> My Tickets </Link>
            </Menu.Item>
          </Menu>
        </div>
        <div className='navbar-logout'>
          <Menu className="navbar-menu-box" onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
            <Menu.Item key="logout">
              <Link to="/"> Logout </Link>
            </Menu.Item>
          </Menu>
        </div>

      </div>
    );
  }
}

export default Header;