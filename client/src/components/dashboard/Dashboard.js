import React, { useEffect, Fragment } from 'react';
import { deleteAccount } from '../../actions/auth';
import { createProfile, getCurrentProfile } from '../../actions/profile';
import spinner from '../../images/Spinner.gif';
import './Dashboard.css';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

const Dashboard = ({ user, profileLoading, isAuthenticated, getCurrentProfile }) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  if (user) {
    if ('master' in user) {
      if (user.master) {
        return <Redirect to='/admin-dashboard' />;
      }
    }
  }

  if (!user && !isAuthenticated) {
    return <Redirect to='/' />;
  }

  if (profileLoading) {
    return <img src={spinner} className='center' alt='loading' />;
  }

  return (
    <Fragment>
      <div className='ProfileGrid'>
        <Link to='/orders'>
          <button className='ProfileButton'>Your Orders</button>
        </Link>
        <Link to='/update-user'>
          <button className='ProfileButton'>Login {'&'} Security</button>
        </Link>
        <Link to='/update-profile'>
          <button className='ProfileButton'>Your Profile</button>
        </Link>
        <Link to='/wish-list'>
          <button className='ProfileButton'>Wish-List</button>
        </Link>
        <Link to='/cart'>
          <button className='ProfileButton'>Cart</button>
        </Link>
      </div>
    </Fragment>
  );
};

Dashboard.propTypes = {
  profileLoading: PropTypes.bool,
  deleteAccount: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profileLoading: state.profile.profileLoading,
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, { deleteAccount, createProfile, getCurrentProfile })(
  Dashboard
);
