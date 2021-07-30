import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Sale = (props) => {
  return (
    <Fragment>
      <div className='ShopBackground' style={{ height: '440px' }}></div>
      <div className='SaleGrid'></div>
    </Fragment>
  );
};

Sale.propTypes = {};

export default Sale;
