import React, { useState, Fragment } from 'react';
import './Shop.css';
import { getCategories, getItem, getItems, getItemById } from '../../actions/shop';
import HeaderImages from './HeaderImages';
import Pets from './Pets';
import About from './About';
import Sale from './Sale';
import Subscribe from './Subscribe';
import Blog from './Blog';
import spinner from '../../images/Spinner.gif';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Shop = ({ authLoading }) => {
  let [yOffset, setYOffset] = useState(0);
  const setY = () => {
    setYOffset(window.pageYOffset);
  };
  window.addEventListener('scroll', setY, { passive: true });

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
  item: PropTypes.object,
  items: PropTypes.array,
  categories: PropTypes.array,
  authLoading: PropTypes.bool,
  getCategories: PropTypes.func.isRequired,
  getItem: PropTypes.func.isRequired,
  getItems: PropTypes.func.isRequired,
  getItemById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  item: state.shop.item,
  items: state.shop.items,
  categories: state.shop.categories,
  authLoading: state.auth.loading,
});

export default connect(mapStateToProps, { getCategories, getItem, getItems, getItemById })(Shop);
