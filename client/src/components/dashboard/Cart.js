import React from 'react';
import { setItem } from '../../actions/shop';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// CART ITEMS ONLY HAVE ID, NEED TO GET ALL ITEMS INFO

const Cart = ({ setItem, cart }) => {
  return (
    <div className='CartContainer'>
      <div className='ShoppingCart'>
        <div className='ShoppingCartTitle'>
          <h2>Shopping Cart</h2>
          <button>Remove Selected</button>
        </div>
        {cart.map((item) => {
          return (
            <div className='ShoppingCartItem'>
              <input className='ShoppingCartItemCheckBox' type='checkbox' />
              <div className='ShoppingCartImage'>
                <img className='Image' src={`api/inventory/image/${item.image_filename}`} />
              </div>
              <h5>{item.name}</h5>
              <h6>${item.price}</h6>
              <h6>{item.name}</h6>
              <h6>{item.stock}</h6>
            </div>
          );
        })}
      </div>
      <div className='CheckoutBox'></div>
    </div>
  );
};

Cart.propTypes = {
  cart: PropTypes.array,
  setItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.profile.profile.cart,
});

export default connect(mapStateToProps, { setItem })(Cart);
