import React, { useState } from 'react';
import { createItem, setToggleItemModal } from '../../actions/inventory';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Alert from 'react-bootstrap/alert';

const CreateItem = ({ createItem, toggleItemModal, setToggleItemModal }) => {
  const [newItem, setNewItem] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
  });
  const [newFile, setNewFile] = useState('');
  const [showAlert, setShowAlert] = useState(false);

  const { name, category, price, stock } = newItem;

  const onChange = (e) => {
    setNewItem({ ...newItem, [e.target.name]: e.target.value });
  };

  const onFileChange = (e) => {
    setNewFile(e.target.files[0]);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (name !== '' && category !== '' && price !== '' && stock !== '' && newFile !== '') {
      createItem(newItem, newFile);
      setToggleItemModal(!toggleItemModal);
    } else {
      setShowAlert(true);
    }
  };

  return (
    <div>
      {showAlert && (
        <Alert
          variant='secondary'
          style={{ position: 'fixed', width: '600px' }}
          onClose={() => setShowAlert(false)}
          dismissible
        >
          Please fill out all fields
        </Alert>
      )}
      <div className='UpdateItemBox' style={{ backgroundColor: 'rgb(27, 27, 27)' }}>
        <h4 className='UpdateItemBoxTitle'>Create Item</h4>
        <form onSubmit={(e) => onSubmit(e)}>
          <div className='UpdateItemInputFlexBox'>
            <p className='UpdateItemInputTitle'>Name: </p>
            <input
              className='UpdateItemInput'
              type='text'
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
              name='category'
              value={category}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='UpdateItemInputFlexBox'>
            <p className='UpdateItemInputTitle'>Price: </p>
            <input
              className='UpdateItemInput'
              type='text'
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
              name='stock'
              value={stock}
              onChange={(e) => onChange(e)}
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
          </div>
        </form>
      </div>
    </div>
  );
};

CreateItem.propTypes = {
  createItem: PropTypes.func.isRequired,
  setToggleItemModal: PropTypes.func.isRequired,
  toggleItemModal: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  toggleItemModal: state.inventory.toggleItemModal,
});

export default connect(mapStateToProps, { createItem, setToggleItemModal })(CreateItem);
