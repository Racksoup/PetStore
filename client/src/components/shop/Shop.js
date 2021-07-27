import React, { useState, useEffect, Fragment } from 'react';
import { getCategories, getItem, getItems, getItemById } from '../../actions/shop';
import ShopHome from './ShopHome';
import spinner from '../../images/Spinner.gif';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Shop = ({ authLoading }) => {
  return (
    <Fragment>
      {authLoading ? (
        <img src={spinner} alt='loading' />
      ) : (
        <Fragment>
          <ShopHome />
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
