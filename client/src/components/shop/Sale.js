import React, { Fragment, useEffect } from 'react';
import { getSaleItems, setItem } from '../../actions/shop';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const Sale = ({ saleItems, getSaleItems, setItem }) => {
  useEffect(() => {
    getSaleItems();
  }, [getSaleItems]);

  return (
    <Fragment>
      <div className='ShopBackground' style={{ height: '480px' }}></div>
      <div className='SaleGrid'>
        {saleItems.map((item) => {
          return (
            <div className='SaleItemContainer' onClick={() => setItem(item)}>
              <Link to='/item'>
                <img
                  className='PetContainerImage'
                  src={`api/inventory/image/${item.image_filename}`}
                  alt={item.image_filename}
                />
              </Link>
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
  setItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  saleItems: state.shop.saleItems,
});

export default connect(mapStateToProps, { getSaleItems, setItem })(Sale);
