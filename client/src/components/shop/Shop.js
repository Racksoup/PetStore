import React, { useState, useEffect, Fragment } from 'react';
import { getCategories, getItem, getItems, getItemById } from '../../actions/shop';
import ShopHome from './ShopHome';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/button';
import Dropdown from 'react-bootstrap/dropdown';

const Shop = ({ item, items, categories, getCategories, getItem, getItems, getItemById }) => {
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
      <InputGroup className='mx-auto mb-1 mt-1'>
        <Dropdown className='col-sm-2 px-0 mr-1'>
          <Dropdown.Toggle style={{ width: '100%' }} variant='dark'>
            Categories
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {categories.map((category, i) => {
              return (
                <Dropdown.Item
                  key={i}
                  value={category}
                  name='search'
                  onClick={(e) => onDropdownClick(e)}
                >
                  {category}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
        <Form.Control
          className='col-sm-9 '
          style={{ background: 'rgb(40,40,40)', border: 'none' }}
          type='text'
          name='search'
          onChange={(e) => onSearchChange(e)}
        />
        <Button
          className='col-sm-1 ml-1'
          style={{ background: 'none', borderColor: '#2cc61b', color: '#2cc61b' }}
          type='submit'
          text='search'
          onClick={(e) => onSearchClick(e)}
        >
          <div className='searchText'>Search</div>
        </Button>
      </InputGroup>
      <ShopHome />
    </Fragment>
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
