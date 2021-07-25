import React, { Fragment } from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const MyNavbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  return (
    <Nav>
      <h1>
        <Link to='/'>Home</Link>
      </h1>
      <ul>
        <li>
          <Link to='/'>Developers</Link>
        </li>
        <li>
          <Link to='/'>Register</Link>
        </li>
        <li>
          <Link to='/'>Login</Link>
        </li>
      </ul>
    </Nav>
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
