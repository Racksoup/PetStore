import React, { Fragment, useEffect } from 'react';
import './Dashboard.css';
import UpdateUser from './UpdateUser';
import LoginUpdateUser from './LoginUpdateUser';
import {
  setToggleUpdateUserLogin,
  setToggleUserModal,
  logout,
  deleteAccount,
} from '../../actions/auth';

import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const User = ({
  user,
  toggleUpdateUserLogin,
  toggleUserModal,
  setToggleUpdateUserLogin,
  setToggleUserModal,
  logout,
  isAuthenticated,
  loadingAuth,
  deleteAccount,
}) => {
  useEffect(() => {
    if (isAuthenticated) {
      setToggleUserModal(true);
    }
  }, [isAuthenticated, setToggleUserModal]);

  useEffect(() => {
    setToggleUpdateUserLogin(false);
    setToggleUserModal(false);
  }, [setToggleUpdateUserLogin, setToggleUserModal]);

  const UpdateUserModal = () => {
    if (toggleUserModal) {
      return (
        <div className='ModalBackground' onClick={() => onBackgroundClick()}>
          <div className='Modal' onClick={(e) => handleChildClick(e)}>
            <UpdateUser />
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  const UpdateUserLoginModal = () => {
    if (toggleUpdateUserLogin) {
      return (
        <div className='ModalBackground' onClick={() => onBackgroundClick()}>
          <div className='Modal' onClick={(e) => handleChildClick(e)}>
            <LoginUpdateUser />
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  const onBackgroundClick = (e) => {
    setToggleUpdateUserLogin(false);
    setToggleUserModal(false);
  };

  const handleChildClick = (e) => {
    e.stopPropagation();
  };

  const updateUserButton = () => {
    logout();
    setToggleUpdateUserLogin(true);
  };

  if (!user) {
    return <Redirect to='/' />;
  }

  return (
    <Fragment>
      {!isAuthenticated && !toggleUpdateUserLogin && !toggleUserModal && !loadingAuth && (
        <Redirect to='/login' />
      )}
      {UpdateUserLoginModal()}
      {UpdateUserModal()}
      <div className='UserBox'>
        <div className='UserTitleBox'>
          <Link to='/dashboard'>
            <button className='UserBackButton'>Back</button>
          </Link>
          <h3 className='UserTitle'>User</h3>
          <button className='UpdateUserButton' onClick={() => updateUserButton()}>
            Update User
          </button>
        </div>
        <div className='UserInfoBox'>
          <h2 className='UserInfoTitle'>Info</h2>
          <div className='UserInfoItem'>
            <p className='UserInfoTag'>Name:</p>
            <p className='UserInfoValue'>{user.username}</p>
          </div>
        </div>
        <button className='UserDeleteButton' onClick={() => deleteAccount()}>
          Delete User
        </button>
      </div>
    </Fragment>
  );
};

User.propTypes = {
  user: PropTypes.object,
  toggleUpdateUserLogin: PropTypes.bool,
  toggleUserModal: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  loadingAuth: PropTypes.bool,
  setToggleUpdateUserLogin: PropTypes.func.isRequired,
  setToggleUserModal: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  toggleUpdateUserLogin: state.auth.toggleUpdateUserLogin,
  toggleUserModal: state.auth.toggleUserModal,
  isAuthenticated: state.auth.isAuthenticated,
  loadingAuth: state.auth.loadingAuth,
});

export default connect(mapStateToProps, {
  setToggleUpdateUserLogin,
  setToggleUserModal,
  logout,
  deleteAccount,
})(User);
