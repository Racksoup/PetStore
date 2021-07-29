import React, { Fragment } from 'react';
import './Dashboard.css';
import UpdateUser from './UpdateUser';
import { setToggleUserModal } from '../../actions/auth';

import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const User = ({ user, toggleUserModal, setToggleUserModal }) => {
  const UpdateUserModal = () => {
    if (toggleUserModal) {
      return (
        <div className='ModalBackground' onClick={() => setToggleUserModal(!toggleUserModal)}>
          <div className='Modal' onClick={(e) => handleChildClick(e)}>
            <UpdateUser />
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  const handleChildClick = (e) => {
    e.stopPropagation();
  };

  if (!user) {
    return <Redirect to='/' />;
  }

  return (
    <Fragment>
      {UpdateUserModal()}
      <div className='UserTitleBox'>
        <Link to='/dashboard'>
          <button className='UserBackButton'>Back</button>
        </Link>
        <h3 className='UserTitle'>User</h3>
        <button className='UpdateUserButton' onClick={() => setToggleUserModal(true)}>
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
    </Fragment>
  );
};

User.propTypes = {
  user: PropTypes.object,
  toggleUserModal: PropTypes.bool,
  setToggleUserModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  toggleUserModal: state.auth.toggleUserModal,
});

export default connect(mapStateToProps, { setToggleUserModal })(User);
