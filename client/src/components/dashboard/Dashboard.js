import React, { useState, useEffect, Fragment } from 'react';
import { deleteAccount } from '../../actions/auth';
import { createProfile, getCurrentProfile } from '../../actions/profile';
import UpdateHeaderImages from './UpdateHeaderImages';
import spinner from '../../images/Spinner.gif';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import Button from 'react-bootstrap/button';

const Dashboard = ({
  profileLoading,
  deleteAccount,
  isAuthenticated,
  createProfile,
  profile,
  getCurrentProfile,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  const [newProfile, setNewProfile] = useState({
    name: '',
    email: '',
    address: '',
  });
  const [updateToggle, setUpdateToggle] = useState(false);

  const { name, email, address } = newProfile;

  const onChange = (e) => {
    setNewProfile({ ...newProfile, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    createProfile(newProfile);
    setUpdateToggle(false);
  };

  if (!isAuthenticated) {
    return <Redirect to='/' />;
  }
  return (
    <div className='LoginContainer'>
      {profileLoading ? (
        <img src={spinner} alt='loading' />
      ) : (
        <Fragment>
          <h2>Logged In</h2>
          <br />
          <Button sytle={{ color: 'white' }} variant='primary' onClick={() => deleteAccount()}>
            DELETE
          </Button>
          {/* {profile.master === true && ( */}
          <Link sytle={{ color: 'white' }} to='inventory'>
            <Button variant='primary'>Update Inventory</Button>
          </Link>
          {/* )} */}
          {profile === null ? (
            <div>
              <h2>Create a Profile</h2>
              <form onSubmit={(e) => onSubmit(e)}>
                <div>
                  <input
                    type='text'
                    placeholder='Name'
                    name='name'
                    value={name}
                    onChange={(e) => onChange(e)}
                  />
                </div>
                <div>
                  <input
                    type='text'
                    placeholder='Email'
                    name='email'
                    value={email}
                    onChange={(e) => onChange(e)}
                  />
                </div>

                <div>
                  <input
                    type='text'
                    placeholder='Address'
                    name='address'
                    value={address}
                    onChange={(e) => onChange(e)}
                  />
                </div>

                <input type='submit' value='Submit' />
              </form>
            </div>
          ) : (
            <div>
              <ul>
                <li>Name: {profile.name}</li>
                <li>Email: {profile.email}</li>
                <li>Address: {profile.address}</li>
              </ul>
              {updateToggle === false ? (
                <Button variant='primary' onClick={() => setUpdateToggle(!updateToggle)}>
                  Update Profile
                </Button>
              ) : (
                <div>
                  <h2>Update Profile</h2>
                  <form onSubmit={(e) => onSubmit(e)}>
                    <div>
                      <input
                        type='text'
                        placeholder='Name'
                        name='name'
                        value={name}
                        onChange={(e) => onChange(e)}
                      />
                    </div>
                    <div>
                      <input
                        type='text'
                        placeholder='Email'
                        name='email'
                        value={email}
                        onChange={(e) => onChange(e)}
                      />
                    </div>

                    <div>
                      <input
                        type='text'
                        placeholder='Address'
                        name='address'
                        value={address}
                        onChange={(e) => onChange(e)}
                      />
                    </div>

                    <input type='submit' value='Submit' />
                  </form>
                </div>
              )}
            </div>
          )}
          <UpdateHeaderImages />
        </Fragment>
      )}
    </div>
  );
};

Dashboard.propTypes = {
  profileLoading: PropTypes.bool,
  deleteAccount: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  profile: PropTypes.object,
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profileLoading: state.profile.profileLoading,
  isAuthenticated: state.auth.isAuthenticated,
  profile: state.profile.profile,
});

export default connect(mapStateToProps, { deleteAccount, createProfile, getCurrentProfile })(
  Dashboard
);
