import React from 'react';
import { setItem } from '../../actions/shop';
import spinner from '../../images/Spinner.gif';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const BrowseItems = ({ items, setItem }) => {
  if (items.length === 0) {
    return <h5>No items found</h5>;
    //return <img src={spinner} className='center' alt='loading' />;
  }
  return (
    <div className='BrowseItemsContainer'>
      <div className='BrowseItemsHeader'>
        <h6>
          {items && Object.values(items).length} results for {items && items[0].category}
        </h6>
        <div className='SortByBox'>
          <p className='SortByTag'>Sort by:</p>
          <select className='SortBySelect'>
            <option>featured</option>
          </select>
        </div>
      </div>
      <div className='BrowseItemsRows'>
        {items.map((item) => {
          return (
            <div className='BrowseItemContainer'>
              <Link to='/item'>
                <div className='BrowseItemImage' onClick={() => setItem(item)}>
                  <img
                    className='Image'
                    alt={item.name}
                    src={`api/inventory/image/${item.image_filename}`}
                  />
                </div>
              </Link>
              <h3>{item.name}</h3>
              <h5>${item.price}</h5>
            </div>
          );
        })}
      </div>
    </div>
  );
};

BrowseItems.propTypes = {
  items: PropTypes.array.isRequired,
  setItem: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  items: state.shop.items,
});

export default connect(mapStateToProps, { setItem })(BrowseItems);
