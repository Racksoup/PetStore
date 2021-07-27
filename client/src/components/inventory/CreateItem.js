import React, { useState } from 'react';
import { createItem } from '../../actions/inventory';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/button';

const CreateItem = ({ createItem }) => {
  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
  });
  const [newFile, setNewFile] = useState('');

  const { name, category, price, stock } = newItem;
  const { file } = newFile;
  const onChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const onFileChange = (e) => {
    setNewFile(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    createItem(newItem, newFile);
  };

  return (
    <div>
      <div>
        <h2>Create Item</h2>
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
              type='text'
              placeholder='Price'
              name='price'
              value={price}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div>
            <input
              type='text'
              placeholder='Stock'
              name='stock'
              value={stock}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div>
            <input type='file' name='file' value={file} onChange={(e) => onFileChange(e)} />
          </div>

          <input type='submit' value='Submit' />
        </form>
        <Link to='/inventory'>
          <Button variant='primary'>Back to Inventory</Button>
        </Link>
      </div>
    </div>
  );
};

CreateItem.propTypes = {
  createItem: PropTypes.func.isRequired,
};

export default connect(null, { createItem })(CreateItem);
