import React, { Fragment } from 'react';
import emailjs from 'emailjs-com';

const Subscribe = (props) => {
  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm('service_oyteiuz', 'template_7ti6ezj', e.target, 'user_mAV5lf9i0he1cOe6oPCgj')
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  }

  return (
    <Fragment>
      <div className='SubscribeBackground' style={{ height: '300px' }}></div>
      <div className='SubscribeContainer'>
        <h2 className='SubscribeTitle'>Subscribe for Coupon-Codes and our Newsletter</h2>
        <div className='SubscribeInputContainer'>
          <form onSubmit={sendEmail}>
            <input type='hidden' name='contact_number' />
            <input type='hidden' name='my_email' value='MonarchPenguin@outlook.com' />
            <label>Name</label>
            <input type='text' name='user_name' />
            <label>Email</label>
            <input type='email' name='user_email' />
            <input type='submit' value='Send' />
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Subscribe;
