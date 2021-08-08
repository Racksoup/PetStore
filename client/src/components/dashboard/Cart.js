import React, { useEffect, useState } from 'react';
import { setItem } from '../../actions/shop';
import {
  getAllCartItems,
  removeCartItem,
  getCurrentProfile,
  updateQuantity,
} from '../../actions/profile';
import spinner from '../../images/Spinner.gif';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

const Cart = ({
  setItem,
  removeCartItem,
  updateQuantity,
  getCurrentProfile,
  getAllCartItems,
  items,
  profile,
  isAuthenticated,
}) => {
  const initCheckedState = () => {
    if (profile !== null && profile !== undefined) {
      const arr = profile.cart.map((cartItem) => {
        return {
          _id: cartItem._id,
          checked: false,
        };
      });
      return arr;
    }
  };
  const [checkedItems, setCheckedItems] = useState(initCheckedState());
  const [checkout, setCheckout] = useState([]);
  useEffect(() => {
    getAllCartItems();
    getCurrentProfile();
  }, []);

  useEffect(() => {
    setCheckedItems(initCheckedState());
  }, [profile]);

  const onCheck = (item) => {
    const newChecked = checkedItems.map((x) => {
      if (x._id === item._id) {
        x.checked = !x.checked;
        return x;
      } else {
        return x;
      }
    });
    setCheckedItems(newChecked);

    let newCheckout;
    let removedItem = false;
    newCheckout = checkout.filter((checkoutItem) => {
      if (checkoutItem._id !== item._id) {
        return checkoutItem;
      } else {
        removedItem = true;
      }
    });
    if (!removedItem) {
      newCheckout = [...checkout, item];
    }

    newCheckout.map((newCheckoutItem) => {
      profile.cart.map((cartItem) => {
        if (cartItem._id === newCheckoutItem._id) {
          newCheckoutItem.quantity = cartItem.quantity;
        }
      });
    });

    setCheckout(newCheckout);
  };

  const removeCartItems = () => {
    let newProfile = {};
    let newItems = items;
    newProfile._id = profile._id;
    newProfile.cart = profile.cart;

    checkedItems.map((checkedItem) => {
      if (checkedItem.checked) {
        newProfile.cart = newProfile.cart.filter((item) => {
          if (checkedItem._id !== item._id) {
            return item;
          }
        });
        newItems = newItems.filter((item) => {
          if (checkedItem._id !== item._id) {
            return item;
          }
        });
      }
    });

    const newCheckedItems = checkedItems.filter((checkedItem) => {
      if (checkedItem.checked !== true) {
        return checkedItem;
      }
    });
    setCheckedItems(newCheckedItems);
    removeCartItem(newProfile, newItems);
  };

  const removeSingleCartItem = (oldItem) => {
    let newProfile = {};
    let newItems = items;
    newProfile._id = profile._id;
    newProfile.cart = profile.cart;
    newProfile.cart = newProfile.cart.filter((item) => {
      if (oldItem._id !== item._id) {
        return item;
      }
    });
    newItems = newItems.filter((item) => {
      if (oldItem._id !== item._id) {
        return item;
      }
    });

    const newCheckedItems = checkedItems.filter((checkedItem) => {
      if (checkedItem._id !== oldItem.id) {
        return checkedItem;
      }
    });
    setCheckedItems(newCheckedItems);
    removeCartItem(newProfile, newItems);
  };

  const imageClicked = (item) => {
    setItem(item);
  };

  const burger = () => {
    const newCheckout = checkout;
    newCheckout.map((item) => {
      return (item.totalPrice = parseInt(item.price) * item.quantity);
    });
    const price = newCheckout.reduce((total, item) => total + item.totalPrice, 0);
    return price;
  };

  const clickUpdateQuantity = (e, item) => {
    const newCheck = checkedItems.map((item) => (item.checked = false));
    setCheckedItems(newCheck);

    setCheckout([]);
    updateQuantity(e, item);
  };

  if (!isAuthenticated) return <Redirect to='/login' />;

  if (!items && !profile) {
    return <img src={spinner} alt='loading' />;
  }
  return (
    <div className='CartContainer'>
      <div className='ShoppingCart'>
        <div className='ShoppingCartTitle'>
          <h2>Shopping Cart</h2>
          <button onClick={() => removeCartItems()}>Remove Selected</button>
        </div>
        {profile &&
          checkedItems &&
          items.map((item) => {
            let currCartItem;
            let currCheckedItem;
            let checkedItemIsPresent = false;
            profile.cart.map((cartItem) => {
              if (cartItem._id === item._id) {
                currCartItem = cartItem;
              }
            });
            checkedItems.map((checkedItem) => {
              if (checkedItem._id === item._id) {
                currCheckedItem = checkedItem;
                checkedItemIsPresent = true;
              }
            });
            if (checkedItemIsPresent) {
              return (
                <div className='ShoppingCartItem'>
                  <div className='ShoppingButtonSeperator'>
                    <input
                      className='ShoppingCartItemCheckBox'
                      type='checkbox'
                      checked={currCheckedItem.checked}
                      onClick={() => onCheck(item)}
                    />
                    <div className='ShoppingCartImage' onClick={() => imageClicked(item)}>
                      <Link to='/item'>
                        <img
                          className='Image'
                          alt={item.name}
                          src={`api/inventory/image/${item.image_filename}`}
                        />
                      </Link>
                    </div>
                    <div className='ShoppingCartItemInfo'>
                      <h5>{item.name}</h5>
                      <h6>${item.price}</h6>
                      <h6>{item.name}</h6>
                      <h6>{item.stock}</h6>
                      <h6>{currCartItem.quantity}</h6>

                      <input
                        type='number'
                        id={item._id}
                        value={currCartItem.quantity}
                        onChange={(e) => clickUpdateQuantity(e, item)}
                      />
                    </div>
                  </div>
                  <button className='ShoppingCartDelete' onClick={() => removeSingleCartItem(item)}>
                    Delete Item
                  </button>
                </div>
              );
            }
          })}
      </div>
      <div className='CheckoutBox'>
        <h4>Subtotal</h4>
        <h4>
          ({checkout.length}item): ${burger()}
        </h4>
        <button>Proceed to Checkout</button>
      </div>
    </div>
  );
};

Cart.propTypes = {
  items: PropTypes.array.isRequired,
  profile: PropTypes.object,
  isAuthenticated: PropTypes.bool.isRequired,
  setItem: PropTypes.func.isRequired,
  getAllCartItems: PropTypes.func.isRequired,
  updateQuantity: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
  removeCartItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile.profile,
  items: state.shop.items,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  setItem,
  updateQuantity,
  getAllCartItems,
  getCurrentProfile,
  removeCartItem,
})(Cart);
