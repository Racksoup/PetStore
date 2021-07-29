import React from 'react';
import PropTypes from 'prop-types';

const UpdateProfile = (props) => {
  return (
    <div className='UpdateProfileBox'>
      <h3 className='UpdateProfileTitle'>Update Profile</h3>
      <form>
        <div className='UpdateProfileItem'>
          <p className='UpdateProfileItemTag'>Name:</p>
          <input className='UpdateProfileInput' />
        </div>
        <div className='UpdateProfileItem'>
          <p className='UpdateProfileItemTag'>Email:</p>
          <input className='UpdateProfileInput' />
        </div>
        <div className='UpdateProfileItem'>
          <p className='UpdateProfileItemTag'>Address:</p>
          <input className='UpdateProfileInput' />
        </div>
        <div className='UpdateProfileItem'>
          <input type='submit' value='Submit' className='UpdateProfileSubmit' />
        </div>
      </form>
    </div>
  );
};

UpdateProfile.propTypes = {};

export default UpdateProfile;
