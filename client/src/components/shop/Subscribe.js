import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Subscribe = (props) => {
  return (
    <Fragment>
      <div className='SubscribeBackground' style={{ height: '300px' }}></div>
      <div className='SubscribeContainer'>
        <h2 className='SubscribeTitle'>Subscribe for Coupon-Codes and our Newsletter</h2>
        <div className='SubscribeInputContainer'>
          <input type='text' className='SubscribeInput' value='Enter Email' />
          <button className='SubscribeButton'>Subscribe</button>
        </div>
      </div>
    </Fragment>
  );
};

Subscribe.propTypes = {};

export default Subscribe;
