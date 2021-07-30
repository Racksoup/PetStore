import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

const Footer = (props) => {
  return (
    <Fragment>
      <div className='Footer'>
        <div className='FooterForm'>
          <h4 className='FooterFormTitle'>Sign up and save</h4>
          <h5 className='FooterFormInfo'>Subscribe for all the best pet news and deals!</h5>
        </div>
        <div className='FooterLinks'></div>
      </div>
    </Fragment>
  );
};

Footer.propTypes = {};

export default Footer;
