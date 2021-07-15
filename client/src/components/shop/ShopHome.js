import React from 'react';
import backgroundImg from '../../images/GreyBackground.png';

import PropTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';

const ShopHome = (props) => {
  return (
    <Carousel className='mx-auto' style={{ height: '400px', width: '1000px' }}>
      <Carousel.Item style={{ height: '400px', width: '1000px' }}>
        <div style={{ height: '100%', width: '100%' }}>
          <img style={{ height: '100%', width: '100%' }} src={backgroundImg} alt='first slide' />
        </div>
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={{ height: '400px', width: '1000px' }}>
        <div style={{ height: '100%', width: '100%' }}>
          <img style={{ height: '100%', width: '100%' }} src={backgroundImg} alt='Second slide' />
        </div>
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

ShopHome.propTypes = {};

export default ShopHome;
