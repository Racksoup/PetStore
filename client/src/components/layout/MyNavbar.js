import React, { Fragment } from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

const MyNavbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  return (
    <Fragment>
      <Navbar className='d-flex justify-content-center' style={{ background: '#38281c' }}>
        <Navbar.Text className='mr-auto pl-3'>
          <Link to='/' style={{ color: 'white', fontSize: '20px' }}>
            {'Pets&Paws'}
          </Link>
        </Navbar.Text>
        <Navbar.Text className='ml-5 pl-5'>
          <Link to='/dashboard' style={{ color: 'white', fontSize: '20px' }}>
            Profile
          </Link>
        </Navbar.Text>
        <Nav className='ml-auto align-items-center'>
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
            <Button
              onClick={logout}
              href='#!'
              style={{ color: 'white', margin: '5px', background: '#155e0d', border: 'none' }}
            >
              Logout
            </Button>
          </Navbar.Text>
        </Nav>
      </Navbar>
    </Fragment>
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
