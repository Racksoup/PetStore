import React, { useState, useEffect, Fragment } from 'react';
import { getCategories, getItem, getItems, getItemById } from '../../actions/shop';
import ShopHome from './ShopHome';
import spinner from '../../images/Spinner.gif';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/button';
import Dropdown from 'react-bootstrap/dropdown';

const Shop = ({
  item,
  items,
  categories,
  authLoading,
  getCategories,
  getItem,
  getItems,
  getItemById,
}) => {
  useEffect(() => {
    getCategories();
  }, [getCategories]);
  const [search, setSearch] = useState('');

  const onSearchChange = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  };

  const onSearchClick = (e) => {
    e.preventDefault();
    categories.map((category) => {
      if (category === search) {
        getItems(search);
      }
    });
  };

  const onDropdownClick = (e) => {
    onSearchChange(e);
    onSearchClick();
  };

  return (
    <Fragment>
      {authLoading ? (
        <img src={spinner} alt='loading' />
      ) : (
        <Fragment>
          <InputGroup className='mx-auto mb-1 mt-1'>
            <select className='SearchDropdown'>
              <option className='SearchOption'>Categories</option>
              {categories.map((category, i) => {
                return (
                  <option
                    className='SearchOption'
                    key={i}
                    value={category}
                    name='search'
                    onClick={(e) => onDropdownClick(e)}
                  >
                    {category}
                  </option>
                );
              })}
            </select>
            <input
              className='SearchInput'
              style={{ background: 'rgb(40,40,40)', border: 'none' }}
              type='text'
              name='search'
              onChange={(e) => onSearchChange(e)}
            />
            <button
              className='SearchButton'
              type='submit'
              text='search'
              onClick={(e) => onSearchClick(e)}
            >
              <div className='searchText'>Search</div>
            </button>
          </InputGroup>
          <ShopHome />
        </Fragment>
      )}
    </Fragment>
  );
};

Shop.propTypes = {
  item: PropTypes.object,
  items: PropTypes.array,
  categories: PropTypes.array,
  authLoading: PropTypes.bool,
  getCategories: PropTypes.func.isRequired,
  getItem: PropTypes.func.isRequired,
  getItems: PropTypes.func.isRequired,
  getItemById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  item: state.shop.item,
  items: state.shop.items,
  categories: state.shop.categories,
  authLoading: state.auth.loading,
});

export default connect(mapStateToProps, { getCategories, getItem, getItems, getItemById })(Shop);
