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
        <h1 className='text'>Register</h1>
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
          <div>
            <div style={{ display: 'inline-block' }}>Master</div>
            <input type='checkbox' name='master' value={master} onChange={(e) => onCheck(e)} />
          </div>
          <button type='submit'>Register</button>
        </form>
        <h4>Already have an account? Click here to login</h4>
        <Button>
          <Link to='login' style={{ color: 'white' }}>
            Login
          </Link>
        </Button>
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
