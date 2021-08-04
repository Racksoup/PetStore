import React, { Fragment } from 'react';

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

export default Subscribe;
