import React, { Fragment, useState, useEffect } from 'react';
import { setToggleUserModal, updateUser } from '../../actions/auth';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const UpdateUser = ({ isAuthenticated, setToggleUserModal, user, updateUser }) => {
  useEffect(() => {
    if (!isAuthenticated) {
      setToggleUserModal(false);
    }
  }, [isAuthenticated]);

  const [newAuth, setNewAuth] = useState({
    username: '',
    password: '',
    password2: '',
    id: user._id,
  });

  const { username, password, password2, id } = newAuth;

  const onChange = (e) => {
    setNewAuth({ ...newAuth, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password === password2) {
      updateUser(username, password, id);
      setToggleUserModal(false);
    } else {
      setToggleUserModal(false);
    }
  };

  return (
    <Fragment>
      <div className='UpdateProfileBox'>
        <h3 className='UpdateProfileTitle'>Update User</h3>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className='UpdateProfileItem'>
            <p className='UpdateProfileItemTag'>Username:</p>
            <input
              className='UpdateProfileInput'
              autoComplete='off'
              type='text'
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
            <p className='UpdateProfileItemTag'>Password:</p>
            <input
              className='UpdateProfileInput'
              type='password'
              name='password2'
              value={password2}
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

UpdateUser.propTypes = {
  setToggleUserModal: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  user: PropTypes.object,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setToggleUserModal, updateUser })(UpdateUser);
