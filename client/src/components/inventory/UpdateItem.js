import React, { useState, Fragment } from 'react';
import { updateItem } from '../../actions/inventory';
import './Inventory.css';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const UpdateItem = ({ updateItem, item }) => {
  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    pet: '',
    price: '',
    stock: '',
    sale: false,
  });
  const [newFile, setNewFile] = useState('');

  const { name, category, pet, price, stock, sale } = newItem;
  const onChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const onFileChange = (e) => {
    setNewFile(e.target.files[0]);
  };

  const onCheck = (val) => {
    setNewItem({ ...newItem, sale: val });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (name === '' && item.name !== null) {
      setNewItem({ ...newItem, name: item.name });
    }
    if (category === '' && item.category !== null) {
      setNewItem({ ...newItem, category: item.category });
    }
    if (pet === '' && item.pet !== null) {
      setNewItem({ ...newItem, pet: item.pet });
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
    <Fragment>
      <div className='UpdateItemGrid'>
        <div className='UpdateItemBox'>
          <h4 className='UpdateItemBoxTitle'>Update Item</h4>
          <form onSubmit={(e) => onSubmit(e)}>
            <div className='UpdateItemInputFlexBox'>
              <p className='UpdateItemInputTitle'>Name: </p>
              <input
                className='UpdateItemInput'
                type='text'
                placeholder={item.name}
                name='name'
                value={name}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='UpdateItemInputFlexBox'>
              <p className='UpdateItemInputTitle'>Category: </p>
              <input
                className='UpdateItemInput'
                type='text'
                placeholder={item.category}
                name='category'
                value={category}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='UpdateItemInputFlexBox'>
              <p className='UpdateItemInputTitle'>Pet: </p>
              <input
                className='UpdateItemInput'
                type='text'
                placeholder={item.pet}
                name='pet'
                value={pet}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='UpdateItemInputFlexBox'>
              <p className='UpdateItemInputTitle'>Price: </p>
              <input
                className='UpdateItemInput'
                type='text'
                placeholder={item.price}
                name='price'
                value={price}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='UpdateItemInputFlexBox'>
              <p className='UpdateItemInputTitle'>Stock: </p>
              <input
                className='UpdateItemInput'
                type='text'
                placeholder={item.stock}
                name='stock'
                value={stock}
                onChange={(e) => onChange(e)}
              />
            </div>

            <div className='UpdateItemInputFlexBox'>
              <p className='UpdateItemInputTitle'>Sale: </p>
              <input
                className='UpdateItemCheckbox'
                type='checkbox'
                name='sale'
                onChange={() => onCheck(!sale)}
              />
            </div>

            <div className='UpdateItemInputFlexBox'>
              <input
                className='UpdateFileInput'
                type='file'
                name='file'
                onChange={(e) => onFileChange(e)}
              />
            </div>

            <div className='UpdateItemInputFlexBox'>
              <input className='UpdateSubmitButton' type='submit' value='Submit' />

              <button className='DeleteItemButton'>Delete</button>
            </div>
          </form>
        </div>
        <div className='UpdateItemBox'>
          <img
            style={{ height: '100%', width: '100%', objectFit: 'cover' }}
            src={`api/inventory/image/${item.image_filename}`}
            alt='Second slide'
          />
        </div>
      </div>
    </Fragment>
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
