import React, { Fragment, useState } from 'react';
import { setToggleProfileModal, updateProfile } from '../../actions/profile';

import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

const UpdateProfile = ({ updateProfile, profile, setToggleProfileModal }) => {
  const [newProfile, setNewProfile] = useState({
    name: '',
    email: '',
    address: '',
    _id: profile._id,
  });

  const { name, email, address } = newProfile;

  const onChange = (e) => {
    setNewProfile({ ...newProfile, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    updateProfile(newProfile);
    setToggleProfileModal(false);
  };

  if (!profile || profile === null || profile === undefined) {
    return <Redirect to='/' />;
  }

  return (
    <Fragment>
      <div className='UpdateProfileBox'>
        <h3 className='UpdateProfileTitle'>Update Profile</h3>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className='UpdateProfileItem'>
            <p className='UpdateProfileItemTag'>Name:</p>
            <input
              className='UpdateProfileInput'
              autoComplete='off'
              type='text'
              name='name'
              value={name}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='UpdateProfileItem'>
            <p className='UpdateProfileItemTag'>Email:</p>
            <input
              className='UpdateProfileInput'
              autoComplete='off'
              type='email'
              name='email'
              value={email}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='UpdateProfileItem'>
            <p className='UpdateProfileItemTag'>Address:</p>
            <input
              className='UpdateProfileInput'
              autoComplete='off'
              type='text'
              name='address'
              value={address}
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

UpdateProfile.propTypes = {
  updateProfile: PropTypes.func.isRequired,
  setToggleProfileModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile.profile,
});

export default connect(mapStateToProps, { updateProfile, setToggleProfileModal })(UpdateProfile);
