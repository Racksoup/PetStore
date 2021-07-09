import React, { useState, Fragment } from 'react';
import { register } from '../../actions/auth';

import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const Register = ({ register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    master: '',
  });

  const { username, password, master } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    register(username, password, master);
  };

  // Redirect if logged in
  if (isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <Fragment>
      <h1 className='text'>Register</h1>
      <form onSubmit={(e) => onSubmit(e)}>
        <div>
          <input
            type='text'
            placeholder='Username'
            name='username'
            value={username}
            onChange={(e) => onChange(e)}
            require
          />
        </div>
        <div>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
            require
          />
        </div>
        <div>
          <input type='checkbox' name='master' value={master} />
        </div>
        <input type='submit' value='Register' />
      </form>
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
