import React, { Fragment, useState } from 'react';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faTimes } from '@fortawesome/free-solid-svg-icons';

const SingleItem = ({ item, profile }) => {
  const [quantity, setQuantity] = useState(1);

  const onChange = (e) => {
    setQuantity(e.target.value);
  };

  return (
    <Fragment>
      <div className='SingleItemPage'>
        <div className='CategoryButtonBox'>
          <button className='Button'>{item.category}</button>
        </div>
        <div className='SingleItem'>
          <div className='ItemImageContainer'>
            <img className='Image' src={`api/inventory/image/${item.image_filename}`} />
          </div>
          <div className='SingleItemInfo'>
            <div className='SingleItemTitle'>
              <h2>{item.name}</h2>
            </div>
            <h3>Price: ${item.price}.00</h3>
            {/* <h5>{item.details}</h5> */}
            <h6>Category: {item.category}</h6>
            <h6>Stock: {item.stock}</h6>
          </div>
          <div className='SingleItemBuyMenu'>
            <p className='ItemBuyMenuVal'>${item.price}.00</p>
            <p className='ItemBuyMenuVal'>Shipping/Handling</p>
            <p className='ItemBuyMenuVal'>${item.price + 5}.00</p>
            <br />
            <p className='ItemBuyMenuVal'>Delivers to:</p>
            <p className='ItemBuyMenuVal'>{profile && profile.address}</p>
            <p className='ItemBuyMenuVal'>
              In Stock{' '}
              {item.stock > 0 ? (
                <FontAwesomeIcon icon={faCheckSquare} />
              ) : (
                <FontAwesomeIcon icon={faTimes} />
              )}
            </p>
            <div className='QuantityBox'>
              <p className='ItemBuyMenuVal QuantityTag'>Qty:</p>
              <input
                className='QuantityInput'
                type='number'
                value={quantity}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='SingleItemButtonContainer'>
              <button className='Button' style={{ width: '100px' }}>
                Add to Cart
              </button>
              <button className='Button' style={{ width: '80px' }}>
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

SingleItem.propTypes = {
  item: PropTypes.object,
  profile: PropTypes.object,
};

const mapStateToProps = (state) => ({
  item: state.shop.item,
  profile: state.shop.profile,
});

export default connect(mapStateToProps, {})(SingleItem);
