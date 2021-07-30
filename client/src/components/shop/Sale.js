import React, { Fragment, useEffect } from 'react';
import { getSaleItems } from '../../actions/shop';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Sale = ({ saleItems, getSaleItems }) => {
  useEffect(() => {
    getSaleItems();
  }, [getSaleItems]);

  return (
    <Fragment>
      <div className='ShopBackground' style={{ height: '480px' }}></div>
      <div className='SaleGrid'>
        {saleItems.map((item) => {
          return (
            <div className='SaleItemContainer'>
              <img
                className='PetContainerImage'
                src={`api/inventory/image/${item.image_filename}`}
                alt={item.image_filename}
              />
            </div>
          );
        })}
      </div>
    </Fragment>
  );
};

Sale.propTypes = {
  saleItems: PropTypes.array,
  getSaleItems: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  saleItems: state.shop.saleItems,
});

export default connect(mapStateToProps, { getSaleItems })(Sale);
