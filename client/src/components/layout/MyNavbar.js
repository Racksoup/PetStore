import React, { Fragment } from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

const MyNavbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  return (
    <Navbar bg='dark'>
      <Navbar.Text className='mr-auto'>
        <Link to='/' style={{ color: 'white', fontSize: '20px' }}>
          Home
        </Link>
      </Navbar.Text>
      <Nav className='mr-sm-2'>
        <Navbar.Text>
          <Link to='/register' style={{ color: 'white', margin: '5px' }}>
            Register
          </Link>
        </Navbar.Text>
        <Navbar.Text>
          <Link to='/login' style={{ color: 'white', margin: '5px' }}>
            Login
          </Link>
        </Navbar.Text>
        <Navbar.Text>
          <Button onClick={logout} href='#!'>
            Logout
          </Button>
        </Navbar.Text>
      </Nav>
    </Navbar>
  );
};

MyNavbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(MyNavbar);
