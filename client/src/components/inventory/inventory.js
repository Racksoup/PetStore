import React, { useState, useEffect } from 'react';
import { getCategories, getItem, getItems, getItemById } from '../../actions/inventory';

import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/button';
import { connect } from 'react-redux';

const Inventory = ({
  isAuthenticated,
  categories,
  getCategories,
  item,
  items,
  getItem,
  getItems,
  getItemById,
}) => {
  useEffect(() => {
    getCategories();
  }, [getCategories]);
  const [searchItem, setSearchItem] = useState('');
  const [toggle, setToggle] = useState(0);

  const submit = async (e) => {
    e.preventDefault();
    let isName = true;
    categories.map((category) => {
      if (category === searchItem) {
        isName = false;
        setToggle(1);
        getItems(searchItem);
      }
    });
    if (searchItem.length === 24 && !/\s/.test(searchItem)) {
      isName = false;
      setToggle(2);
      getItemById(searchItem);
    }
    if (isName) {
      setToggle(2);
      getItem(searchItem);
    }
  };

  const onChange = (e) => {
    setSearchItem(e.target.value);
  };

  if (!isAuthenticated) {
    return <Redirect to='/' />;
  }
  return (
    <div>
      <h2>Update Page</h2>
      <Link to='/dashboard'>
        <Button variant='primary'>Back To Dashboard</Button>
      </Link>
      <h4>Search for item</h4>
      <form onSubmit={(e) => submit(e)}>
        <input type='text' onChange={(e) => onChange(e)} />
        <input type='submit' value='Submit' />
      </form>
    </div>
  );
};

Inventory.propTypes = {
  isAuthenticated: PropTypes.bool,
  categories: PropTypes.array,
  getCategories: PropTypes.func.isRequired,
  getItem: PropTypes.func.isRequired,
  getItems: PropTypes.func.isRequired,
  getItemById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  categories: state.inventory.categories,
  item: state.inventory.item,
  items: state.inventory.items,
});

export default connect(mapStateToProps, { getCategories, getItem, getItems, getItemById })(
  Inventory
);
