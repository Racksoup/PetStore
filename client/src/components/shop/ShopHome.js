import React, { useEffect } from 'react';
import { getHeaderImages } from '../../actions/shop';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';

const ShopHome = ({ headerImages, getHeaderImages }) => {
  useEffect(() => {
    getHeaderImages();
  }, [getHeaderImages]);

  return (
    <Carousel className='mx-auto' style={{ height: '420px' }}>
      {headerImages.map((image) => {
        return (
          <Carousel.Item style={{ height: '420px' }}>
            <div style={{ height: '100%', width: '100%' }}>
              {headerImages.length > 0 ? (
                <img
                  style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                  src={`api/headerimage/image/${image.filename}`}
                  alt={image.filename}
                />
              ) : null}
            </div>
            <Carousel.Caption>
              <h3>Second slide label</h3>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </Carousel.Caption>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

ShopHome.propTypes = {
  headerImages: PropTypes.array,
  getHeaderImages: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  headerImages: state.shop.headerImages,
});

export default connect(mapStateToProps, { getHeaderImages })(ShopHome);
