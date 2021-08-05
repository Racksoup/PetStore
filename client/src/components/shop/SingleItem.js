import React, { Fragment, useState, useEffect } from 'react';
import { getItems } from '../../actions/shop';
import { addToCart, getCurrentProfile } from '../../actions/profile';
import TwitterIcon from '../../images/TwitterIcon.png';
import InstagramIcon from '../../images/InstagramIcon.png';
import PinterestIcon from '../../images/PinterestIcon.png';
import FacebookIcon from '../../images/FacebookIcon.png';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faTimes } from '@fortawesome/free-solid-svg-icons';

const SingleItem = ({ item, items, profile, getItems, getCurrentProfile, addToCart }) => {
  useEffect(() => {
    getCurrentProfile();
  }, []);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (profile !== undefined && profile !== null && item !== null && item !== undefined) {
      if ('cart' in profile) {
        profile.cart.map((cartItem) => {
          if (cartItem._id === item._id) {
            setQuantity(cartItem.quantity);
          }
        });
      }
    }
  }, []);

  const onChange = (e) => {
    setQuantity(e.target.value);
  };

  const onClick = () => {
    if (item.category !== items[0].category) getItems(item.category);
  };

  const addItemToCart = () => {
    let newProfile = {};
    newProfile._id = profile._id;
    if (profile !== undefined) {
      if ('cart' in profile) {
        newProfile.cart = profile.cart;
        newProfile.cart.filter((cartItem) => {
          if (cartItem._id !== item._id) {
            return cartItem;
          }
        });
        newProfile.cart.push({ _id: item._id, quantity });
      } else {
        newProfile.cart = [{ _id: item._id, quantity }];
      }
      addToCart(newProfile);
    }
  };

  const addToWishlist = () => {
    let newProfile = {};
    newProfile._id = profile._id;
    if (profile !== undefined) {
      if ('wishlist' in profile) {
        newProfile.wishlist = profile.wishlist;
        newProfile.wishlist.filter((wishlistItem) => {
          if (wishlistItem._id !== item._id) {
            return wishlistItem;
          }
        });
        newProfile.wishlist.push({ _id: item._id });
      } else {
        newProfile.wishlist = [{ _id: item._id }];
      }
      addToCart(newProfile);
    }
  };

  if (item) {
    return (
      <Fragment>
        <div className='SingleItemPage'>
          <div className='CategoryButtonBox'>
            <Link to='/browse'>
              <button className='Button' onClick={() => onClick()}>
                {item.category}
              </button>
            </Link>
          </div>
          <div className='SingleItem'>
            <div className='ItemImageContainer'>
              <img
                className='Image'
                alt={item.image_filename}
                src={`api/inventory/image/${item.image_filename}`}
              />
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
                {profile && (
                  <button
                    className='Button'
                    onClick={() => addToWishlist()}
                    style={{ width: '140px' }}
                  >
                    Add to Wishlist
                  </button>
                )}
                {profile && (
                  <button
                    className='Button'
                    onClick={() => addItemToCart()}
                    style={{ width: '100px' }}
                  >
                    Add to Cart
                  </button>
                )}
                <button className='Button' style={{ width: '80px' }}>
                  Buy Now
                </button>
              </div>
            </div>
          </div>
          <div className='SingleItemShareLinks'>
            <div className='ShareLinks' style={{ marginLeft: 'auto', marginRight: '50px' }}>
              <div className='ShareLink'>
                <a href='https://www.facebook.com' target='_blank'>
                  <img className='Image' src={FacebookIcon} />
                </a>
              </div>
              <div className='ShareLink'>
                <a href='https://www.instagram.com' target='_blank'>
                  <img className='Image' src={InstagramIcon} />
                </a>
              </div>
              <div className='ShareLink'>
                <a href='https://www.twitter.com' target='_blank'>
                  <img className='Image' src={TwitterIcon} />
                </a>
              </div>
              <div className='ShareLink'>
                <a href='https://www.pinterest.com' target='_blank'>
                  <img className='Image' src={PinterestIcon} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
};

SingleItem.propTypes = {
  item: PropTypes.object,
  items: PropTypes.array,
  profile: PropTypes.object,
  getItems: PropTypes.func.isRequired,
  addToCart: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  item: state.shop.item,
  items: state.shop.items,
  profile: state.profile.profile,
});

export default connect(mapStateToProps, { getItems, addToCart, getCurrentProfile })(SingleItem);
