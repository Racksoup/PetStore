import React, { Fragment } from 'react';
import './Dashboard.css';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const UpdateProfile = ({ profile }) => {
  return (
    <Fragment>
      <div className='ProfileTitleBox'>
        <Link to='/dashboard'>
          <button className='ProfileBackButton'>Back</button>
        </Link>
        <h3 className='ProfileTitle'>Profile</h3>
        <button className='UpdateProfileButton'>Update Profile</button>
      </div>
      <div className='ProfileInfoBox'>
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

UpdateProfile.propTypes = {
  profile: PropTypes.object,
};

const mapStateToProps = (state) => ({
  profile: state.profile.profile,
});

export default connect(mapStateToProps, {})(UpdateProfile);
