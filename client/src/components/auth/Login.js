import React, { useState, Fragment } from 'react';
import { login } from '../../actions/auth';

import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const { username, password } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    login(username, password);
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <Fragment>
      <section className='LoginForm'>
        <h1 className='LoginTitle'>Login</h1>
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
          <input className='LoginSubmit' type='submit' value='Sign In' />
        </form>
        <p className='RegisterLink'>
          <Link to='register' style={{ color: 'white' }}>
            Create Account
          </Link>
        </p>
      </section>
    </Fragment>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
