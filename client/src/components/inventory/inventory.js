import React, { useState } from 'react';
import { createItem } from '../../actions/inventory';

import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import Button from 'react-bootstrap/button';
import { connect } from 'react-redux';

const Inventory = ({ isAuthenticated, createItem }) => {
  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    price: 0,
    stock: 0,
  });

  const { name, category, price, stock } = newItem;
  const onChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    console.log(newItem);
    e.preventDefault();
    createItem(newItem);
  };

  if (!isAuthenticated) {
    return <Redirect to='/' />;
  }
  return (
    <div>
      Hello!
      <Link to='/dashboard'>
        <Button variant='primary'>Back To Dashboard</Button>
      </Link>
      <div>
        <h2>Insert Item</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div>
            <input
              type='text'
              placeholder='Name'
              name='name'
              value={name}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div>
            <input
              type='text'
              placeholder='Category'
              name='category'
              value={category}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div>
            <input
              type='number'
              placeholder='Price'
              name='price'
              value={price}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div>
            <input
              type='number'
              placeholder='Stock'
              name='stock'
              value={stock}
              onChange={(e) => onChange(e)}
            />
          </div>

          <input type='submit' value='Submit' />
        </form>
      </div>
    </div>
  );
};

Inventory.propTypes = {
  isAuthenticated: PropTypes.bool,
  createItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { createItem })(Inventory);
