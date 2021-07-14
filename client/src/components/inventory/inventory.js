import React, { useState, useEffect } from 'react';
import { getCategories, getItem, getItems, getItemById, setToggle } from '../../actions/inventory';
import Categories from './Categories';
import UpdateItem from './UpdateItem';

import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/button';
import { connect } from 'react-redux';

const Inventory = ({
  isAuthenticated,
  categories,
  getCategories,
  getItem,
  getItems,
  getItemById,
  toggle,
  setToggle,
}) => {
  useEffect(() => {
    getCategories();
  }, [getCategories]);
  const [searchItem, setSearchItem] = useState('');

  const View = () => {
    if (toggle === 1) {
      return <Categories props={(toggle, setToggle)} />;
    }
    if (toggle === 2) {
      return <UpdateItem />;
    }
    return null;
  };

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
      <Link to='/create-item'>
        <Button variant='primary'>Create New Item</Button>
      </Link>
      <h4>Search for item</h4>
      <form onSubmit={(e) => submit(e)}>
        <input type='text' onChange={(e) => onChange(e)} />
        <input type='submit' value='Submit' />
      </form>
      {View()}
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
  toggle: PropTypes.number,
  setToggle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  categories: state.inventory.categories,
  toggle: state.inventory.toggle,
});

export default connect(mapStateToProps, {
  getCategories,
  getItem,
  getItems,
  getItemById,
  setToggle,
})(Inventory);
