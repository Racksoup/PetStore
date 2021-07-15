import React, { useState, useEffect } from 'react';
import { getCategories, getItem, getItems, getItemById } from '../../actions/shop';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/button';

const Shop = ({ item, items, categories, getCategories, getItem, getItems, getItemById }) => {
  useEffect(() => {
    getCategories();
  }, [getCategories]);
  const [search, setSearch] = useState('');

  const onSearchChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const onSearchClick = () => {
    categories.map((category) => {
      if (category === search) {
        getItems(search);
      }
    });
  };

  return (
    <div>
      <input className='shopSearch' name='search' onChange={(e) => onSearchChange(e)} />
      <Button onClick={() => onSearchClick()}>Search</Button>
    </div>
  );
};

Shop.propTypes = {
  item: PropTypes.object,
  items: PropTypes.array,
  categories: PropTypes.array,
  getCategories: PropTypes.func.isRequired,
  getItem: PropTypes.func.isRequired,
  getItems: PropTypes.func.isRequired,
  getItemById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  item: state.shop.item,
  items: state.shop.items,
  categories: state.shop.categories,
});

export default connect(mapStateToProps, { getCategories, getItem, getItems, getItemById })(Shop);
