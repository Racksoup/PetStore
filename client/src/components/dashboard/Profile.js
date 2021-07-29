import React, { Fragment } from 'react';
import './Dashboard.css';
import UpdateProfile from './UpdateProfile';
import { setToggleProfileModal } from '../../actions/profile';

import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const Profile = ({ profile, toggleProfileModal, setToggleProfileModal }) => {
  const UpdateProfileModal = () => {
    if (toggleProfileModal) {
      return (
        <div className='ModalBackground' onClick={() => setToggleProfileModal(!toggleProfileModal)}>
          <div className='Modal' onClick={(e) => handleChildClick(e)}>
            <UpdateProfile />
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

  if (!profile) {
    return <Redirect to='/' />;
  }

  return (
    <Fragment>
      {UpdateProfileModal()}
      <div className='ProfileTitleBox'>
        <Link to='/dashboard'>
          <button className='ProfileBackButton'>Back</button>
        </Link>
        <h3 className='ProfileTitle'>Profile</h3>
        <button className='UpdateProfileButton' onClick={() => setToggleProfileModal(true)}>
          Update Profile
        </button>
      </div>
      <div className='ProfileInfoBox'>
        <h2 className='ProfileInfoTitle'>Info</h2>
        <div className='ProfileInfoItem'>
          <p className='ProfileInfoTag'>Name:</p>
          <p className='ProfileInfoValue'>{profile.name}</p>
        </div>
        <div className='ProfileInfoItem'>
          <p className='ProfileInfoTag'>Email:</p>
          <p className='ProfileInfoValue'>{profile.email}</p>
        </div>
        <div className='ProfileInfoItem'>
          <p className='ProfileInfoTag'>Address:</p>
          <p className='ProfileInfoValue'>{profile.address}</p>
        </div>
      </div>
    </Fragment>
  );
};

Profile.propTypes = {
  profile: PropTypes.object,
  toggleProfileModal: PropTypes.bool,
  setToggleProfileModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile.profile,
  toggleProfileModal: state.profile.toggleProfileModal,
});

export default connect(mapStateToProps, { setToggleProfileModal })(Profile);
