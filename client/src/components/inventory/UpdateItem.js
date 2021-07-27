import React, { useState } from 'react';
import { updateItem } from '../../actions/inventory';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const UpdateItem = ({ updateItem, item }) => {
  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
  });
  const [newFile, setNewFile] = useState('');

  const { name, category, price, stock } = newItem;
  const onChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const onFileChange = (e) => {
    setNewFile(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (name === '' && item.name !== null) {
      setNewItem({ ...newItem, name: item.name });
    }
    if (category === '' && item.category !== null) {
      setNewItem({ ...newItem, category: item.category });
    }
    if (price === '' && item.price !== null) {
      setNewItem({ ...newItem, price: item.price });
    }
    if (stock === '' && item.stock !== null) {
      setNewItem({ ...newItem, stock: item.stock });
    }
    updateItem(newItem, newFile, item._id);
  };

  return (
    <div>
      <div>
        <h2>Update Item</h2>
        <form onSubmit={(e) => onSubmit(e)}>
          <div>
            <input
              type='text'
              placeholder={item.name}
              name='name'
              value={name}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div>
            <input
              type='text'
              placeholder={item.category}
              name='category'
              value={category}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div>
            <input
              type='text'
              placeholder={item.price}
              name='price'
              value={price}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div>
            <input
              type='text'
              placeholder={item.stock}
              name='stock'
              value={stock}
              onChange={(e) => onChange(e)}
            />
          </div>

          <div>
            <input type='file' name='file' onChange={(e) => onFileChange(e)} />
          </div>

          <input type='submit' value='Submit' />
        </form>
        <div style={{ height: '200px', width: '200px' }}>
          <img
            style={{ height: '100%', width: '100%', objectFit: 'cover' }}
            src={`api/inventory/image/${item.image_filename}`}
            alt='Second slide'
          />
        </div>
      </div>
    </div>
  );
};

UpdateItem.propTypes = {
  updateItem: PropTypes.func.isRequired,
  item: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  item: state.inventory.item,
});

export default connect(mapStateToProps, { updateItem })(UpdateItem);
