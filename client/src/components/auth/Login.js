import React, { useState, Fragment } from 'react';
import { login } from '../../actions/auth';

import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/button';

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
        <h1 className='text'>Login</h1>
        <form onSubmit={(e) => onSubmit(e)}>
          <div>
            <input
              type='text'
              placeholder='Username'
              name='username'
              value={username}
              onChange={(e) => onChange(e)}
              require='true'
            />
          </div>
          <div>
            <input
              type='password'
              placeholder='Password'
              name='password'
              value={password}
              onChange={(e) => onChange(e)}
              require='true'
            />
          </div>
          <input type='submit' value='Login' />
        </form>
        <h4>Dont have an account? Click here to register an account</h4>
        <Button>
          <Link to='register' style={{ color: 'white' }}>
            Register
          </Link>
        </Button>
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
