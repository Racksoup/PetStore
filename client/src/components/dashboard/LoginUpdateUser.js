import React, { Fragment, useState } from 'react';
import { setToggleUserModal, setToggleUpdateUserLogin, login } from '../../actions/auth';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const LoginUpdateUser = ({ setToggleUserModal, setToggleUpdateUserLogin, login }) => {
  const [newAuth, setNewAuth] = useState({
    username: '',
    password: '',
  });

  const { username, password } = newAuth;

  const onChange = (e) => {
    setNewAuth({ ...newAuth, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login(username, password);
    setToggleUserModal(true);
    setToggleUpdateUserLogin(false);
  };

  return (
    <Fragment>
      <div className='UpdateProfileBox'>
        <h3 className='UpdateProfileTitle'>Update Profile</h3>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className='UpdateProfileItem'>
            <p className='UpdateProfileItemTag'>Username:</p>
            <input
              className='UpdateProfileInput'
              name='username'
              value={username}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='UpdateProfileItem'>
            <p className='UpdateProfileItemTag'>Password:</p>
            <input
              className='UpdateProfileInput'
              type='password'
              name='password'
              value={password}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='UpdateProfileItem'>
            <input type='submit' value='Submit' className='UpdateProfileSubmit' />
          </div>
        </form>
      </div>
    </Fragment>
  );
};

LoginUpdateUser.propTypes = {
  setToggleUpdateUserLogin: PropTypes.func.isRequired,
  setToggleUserModal: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
};

export default connect(null, { setToggleUserModal, setToggleUpdateUserLogin, login })(
  LoginUpdateUser
);
