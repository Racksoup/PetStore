import React from 'react';
import { deleteAccount } from '../../actions/auth';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

const Dashboard = ({ deleteAccount, isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <div>
      Logged In
      <button className='btn btn-danger' onClick={() => deleteAccount()}>
        DELETE
      </button>
    </div>
  );
};

Dashboard.propTypes = {
  deleteAccount: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { deleteAccount })(Dashboard);
