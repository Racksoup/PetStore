import React, { useState, Fragment, useEffect } from 'react';
import './Shop.css';
import HeaderImages from './HeaderImages';
import Pets from './Pets';
import About from './About';
import Sale from './Sale';
import Subscribe from './Subscribe';
import Blog from './Blog';
import spinner from '../../images/Spinner.gif';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { loadUser } from '../../actions/auth';

const Shop = ({ authLoading, user }) => {
  let [yOffset, setYOffset] = useState(0);
  const setY = () => {
    setYOffset(window.pageYOffset);
  };
  window.addEventListener('scroll', setY, { passive: true });

  useEffect(() => {
    loadUser();
  }, [user]);

  return (
    <Fragment>
      {authLoading ? (
        <img src={spinner} alt='loading' />
      ) : (
        <Fragment>
          {yOffset < 1800 && <div className='ShopAboutBackground'></div>}
          <HeaderImages />
          <Pets />
          <About />
          <Sale />
          <Subscribe />
          <Blog />
        </Fragment>
      )}
    </Fragment>
  );
};

Shop.propTypes = {
  authLoading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  authLoading: state.auth.loading,
  user: state.auth.user,
});

export default connect(mapStateToProps, {})(Shop);
