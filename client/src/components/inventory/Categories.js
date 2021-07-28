import React from 'react';
import { getItemById, setToggle } from '../../actions/inventory';
import './Inventory.css';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Categories = ({ items, getItemById, setToggle }) => {
  const onClick = (e) => {
    const id = e.currentTarget.id;
    getItemById(id);
    setToggle(2);
  };

  return (
    <div className='CategoriesContainer'>
      <h3 className='CategoriesTitle'>Category</h3>
      {items.map((item) => {
        return (
          <div className='CategoryItem'>
            <input className='CategoryCheckbox' type='checkbox' />
            <div className='ClickItem' key={item._id} id={item._id} onClick={(e) => onClick(e)}>
              <div style={{ height: '90px', width: '90px' }}>
                <img
                  style={{ height: '100%', width: '100%', objectFit: 'cover' }}
                  src={`api/inventory/image/${item.image_filename}`}
                  alt={item.image_filename}
                />
              </div>

              <div className='CategoryInfoBox'>
                <div>
                  <div style={{ display: 'inline' }}>Name: </div>
                  <p style={{ display: 'inline' }}>{item.name} </p>
                </div>
                <div>
                  <p style={{ display: 'inline' }}>Price: </p>
                  <p style={{ display: 'inline' }}> {item.price} </p>
                </div>
                <div>
                  <p style={{ display: 'inline' }}>Stock: </p>
                  <p style={{ display: 'inline' }}> {item.stock} </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

Categories.propTypes = {
  items: PropTypes.array.isRequired,
  getItemById: PropTypes.func.isRequired,
  setToggle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  items: state.inventory.items,
});

export default connect(mapStateToProps, { getItemById, setToggle })(Categories);
