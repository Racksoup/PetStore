import TwitterIcon from '../../images/TwitterIcon.png';
import InstagramIcon from '../../images/InstagramIcon.png';
import PinterestIcon from '../../images/PinterestIcon.png';
import FacebookIcon from '../../images/FacebookIcon.png';
import React, { Fragment } from 'react';

import { Link } from 'react-router-dom';

const Footer = (props) => {
  return (
    <Fragment>
      <div className='Footer'>
        <div className='FooterForm'>
          <h4 className='FooterFormTitle'>Sign up and save</h4>
          <h5 className='FooterFormInfo'>Subscribe for all the best pet news and deals!</h5>
          <div className='ShareLinks'>
            <div className='ShareLink'>
              <a href='https://www.facebook.com' target='_blank' rel='noopener noreferrer'>
                <img className='Image' src={FacebookIcon} alt='' />
              </a>
            </div>
            <div className='ShareLink'>
              <a href='https://www.instagram.com' target='_blank' rel='noopener noreferrer'>
                <img className='Image' src={InstagramIcon} alt='' />
              </a>
            </div>
            <div className='ShareLink'>
              <a href='https://www.twitter.com' target='_blank' rel='noopener noreferrer'>
                <img className='Image' src={TwitterIcon} alt='' />
              </a>
            </div>
            <div className='ShareLink'>
              <a href='https://www.pinterest.com' target='_blank' rel='noopener noreferrer'>
                <img className='Image' src={PinterestIcon} alt='' />
              </a>
            </div>
          </div>
        </div>
        <div className='FooterLinks'>
          <Link to='/tos' className='FooterLink LinkFormat'>
            <p>Terms of Service</p>
          </Link>
          <Link to='/privacy' className='FooterLink LinkFormat'>
            <p>Privacy</p>
          </Link>
          <Link to='/shipping' className='FooterLink LinkFormat'>
            <p>Shipping</p>
          </Link>
          <Link to='/returns' className='FooterLink LinkFormat'>
            <p>Returns</p>
          </Link>
          <Link to='/blogs' className='FooterLink LinkFormat'>
            <p>Blog</p>
          </Link>
          <Link to='/admin-login' className='FooterLink LinkFormat'>
            <p>Admin</p>
          </Link>
        </div>
      </div>
    </Fragment>
  );
};

export default Footer;
