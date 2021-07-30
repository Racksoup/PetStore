import React, { useEffect } from 'react';
import { getHeaderImages } from '../../actions/shop';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Carousel from 'react-bootstrap/Carousel';

const HeaderImages = ({ headerImages, getHeaderImages }) => {
  useEffect(() => {
    getHeaderImages();
  }, [getHeaderImages]);

  return (
    <Carousel indicators={false} className='mx-auto' style={{ height: '600px' }}>
      {headerImages.map((image) => {
        return (
          <Carousel.Item style={{ height: '600px' }}>
            <div style={{ height: '100%', width: '100%' }}>
              {headerImages.length > 0 ? (
                <img
                  style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                  src={`api/headerimage/image/${image.filename}`}
                  alt={image.filename}
                />
              ) : null}
            </div>
          </Carousel.Item>
        );
      })}
    </Carousel>
  );
};

HeaderImages.propTypes = {
  headerImages: PropTypes.array,
  getHeaderImages: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  headerImages: state.shop.headerImages,
});

export default connect(mapStateToProps, { getHeaderImages })(HeaderImages);
