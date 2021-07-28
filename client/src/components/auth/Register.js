import React, { useState, Fragment } from 'react';
import { register } from '../../actions/auth';

import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/button';

const Register = ({ register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    master: undefined,
  });

  const { username, password, master } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onCheck = (e) => {
    setFormData({ ...formData, [e.target.name]: !e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    register(username, password, master);
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <Fragment>
      <section className='LoginForm'>
        <h1 className='LoginTitle'>Register</h1>
        <form onSubmit={(e) => onSubmit(e)}>
          <div>
            <h6 className='LoginInputTitle'>Username</h6>
            <input
              className='LoginInput'
              type='text'
              name='username'
              value={username}
              onChange={(e) => onChange(e)}
              require='true'
            />
          </div>
          <div>
            <h6 className='LoginInputTitle'>Password</h6>
            <input
              className='LoginInput'
              type='password'
              name='password'
              value={password}
              onChange={(e) => onChange(e)}
              require='true'
            />
          </div>
          <input className='LoginSubmit' type='submit' value='Create Account' />
        </form>
        <p className='RegisterLink'>
          <Link to='register' style={{ color: 'white' }}>
            Sign In
          </Link>
        </p>
      </section>
    </Fragment>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { register })(Register);
