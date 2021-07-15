import React from 'react';
import { getItemById, setToggle } from '../../actions/inventory';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Categories = ({ items, getItemById, setToggle }) => {
  const onClick = (e) => {
    const id = e.currentTarget.id;
    getItemById(id);
    setToggle(2);
  };

  return (
    <div>
      hello
      {items.map((item) => {
        return (
          <div key={item._id} id={item._id} onClick={(e) => onClick(e)}>
            <div style={{ display: 'inline' }}>Name: </div>
            <p style={{ display: 'inline' }}>{item.name} </p>
            <p style={{ display: 'inline' }}>Category: </p>
            <p style={{ display: 'inline' }}> {item.category} </p>
          </div>
        );
      })}
    </div>
  );
};

Categories.propTypes = {
  items: PropTypes.array,
  getItemById: PropTypes.func.isRequired,
  setToggle: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  items: state.inventory.items,
});

export default connect(mapStateToProps, { getItemById, setToggle })(Categories);
