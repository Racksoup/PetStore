import React, { Fragment } from 'react';

import { Link } from 'react-router-dom';

const Footer = (props) => {
  return (
    <Fragment>
      <div className='Footer'>
        <div className='FooterForm'>
          <h4 className='FooterFormTitle'>Sign up and save</h4>
          <h5 className='FooterFormInfo'>Subscribe for all the best pet news and deals!</h5>
        </div>
        <div className='FooterLinks'>
          <Link to='/' className='FooterLink'>
            <p>Terms of Service</p>
          </Link>
          <Link to='/' className='FooterLink'>
            <p>Privacy</p>
          </Link>
          <Link to='/' className='FooterLink'>
            <p>Shipping</p>
          </Link>
          <Link to='/' className='FooterLink'>
            <p>Returns</p>
          </Link>
          <Link to='/' className='FooterLink'>
            <p>Blog</p>
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default Footer;
