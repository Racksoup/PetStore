import React, { Fragment } from 'react';
import './Dashboard.css';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

const AdminDashboard = ({ user, isAuthenticated }) => {
  if (!isAuthenticated || !user.master) {
    return <Redirect to='/' />;
  }

  return (
    <Fragment>
      <div className='AdminGrid'>
        <Link to='/inventory'>
          <button className='AdminButton'>Update Inventory</button>
        </Link>
        <div />
        <Link to='/update-header-images'>
          <button className='AdminButton'>Update Header Images</button>
        </Link>
        <Link to='/create-blog'>
          <button className='AdminButton'>Create Blog Post</button>
        </Link>
        <div />
        <Link to='/edit-blogs'>
          <button className='AdminButton'>Edit Blog Posts</button>
        </Link>
      </div>
    </Fragment>
  );
};

AdminDashboard.propTypes = {
  isAuthenticated: PropTypes.bool,
  user: PropTypes.object,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(AdminDashboard);
