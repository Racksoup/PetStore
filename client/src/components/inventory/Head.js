import React, { useState, useEffect } from 'react';
import {
  getCategories,
  getItem,
  getItemById,
  setToggle,
  setToggleItemModal,
} from '../../actions/inventory';
import { getItems } from '../../actions/shop';
import Categories from './Categories';
import UpdateItem from './UpdateItem';
import CreateItem from './CreateItem';
import './Inventory.css';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons';

const Inventory = ({
  isAuthenticated,
  categories,
  getCategories,
  getItem,
  getItems,
  getItemById,
  toggle,
  setToggle,
  toggleItemModal,
  setToggleItemModal,
}) => {
  useEffect(() => {
    getCategories();
    setToggle(0);
  }, [getCategories, setToggle]);
  const [searchItem, setSearchItem] = useState('');

  const View = () => {
    if (toggle === 0) {
      return <ShowCategories />;
    }
    if (toggle === 1) {
      return <Categories />;
    }
    if (toggle === 2) {
      return <UpdateItem />;
    }
    return null;
  };

  const AddItemModal = () => {
    if (toggleItemModal) {
      return (
        <div className='ModalBackground' onClick={() => setToggleItemModal(!toggleItemModal)}>
          <div className='Modal' onClick={(e) => handleChildClick(e)}>
            <CreateItem />
          </div>
        </div>
      );
    } else {
      return null;
    }
  };

  const ShowCategories = () => {
    return (
      <div className='CategoriesBox'>
        <div className='CategoriesCenterBox'>
          <h1>Categories</h1>
          {categories.map((category) => {
            return (
              <button
                className='CategoryButton'
                value={category}
                onClick={(e) => CategoryButton(e)}
              >
                {category}
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const CategoryButton = (e) => {
    setToggle(1);
    getItems(e.target.value);
  };

  const handleChildClick = (e) => {
    e.stopPropagation();
  };

  const submit = async (e) => {
    if (e) e.preventDefault();
    let isName = true;
    categories.map((category) => {
      if (category === searchItem) {
        isName = false;
        setToggle(1);
        getItems(searchItem);
      }
      return false;
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
      {AddItemModal()}
      <div className='TitleBox'>
        <Link to='dashboard'>
          <button className='BackButton'>Back</button>
        </Link>
        <h2 className='InventoryItemTitle'>Update Item</h2>
        <div className='InventoryItemForm'>
          <button className='AddItemButton' onClick={() => setToggleItemModal(!toggleItemModal)}>
            <div style={{ height: '100%', width: '100%' }}>
              <FontAwesomeIcon className='AddItemIcon' icon={faPlusSquare}></FontAwesomeIcon>
            </div>
          </button>
          <form onSubmit={(e) => submit(e)}>
            <input type='text' onChange={(e) => onChange(e)} />
            <input type='submit' value='Submit' />
          </form>
        </div>
      </div>
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
  toggleItemModal: PropTypes.bool,
  setToggleItemModal: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  categories: state.inventory.categories,
  toggle: state.inventory.toggle,
  toggleItemModal: state.inventory.toggleItemModal,
});

export default connect(mapStateToProps, {
  getCategories,
  getItem,
  getItems,
  getItemById,
  setToggle,
  setToggleItemModal,
})(Inventory);
