import React, { useState, useEffect } from 'react';
import { getCategories, getItem, getItems, getItemById } from '../../actions/shop';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/col';
import Row from 'react-bootstrap/row';
import Container from 'react-bootstrap/container';
import Button from 'react-bootstrap/button';
import Dropdown from 'react-bootstrap/dropdown';

const Shop = ({ item, items, categories, getCategories, getItem, getItems, getItemById }) => {
  useEffect(() => {
    getCategories();
  }, [getCategories]);
  const [search, setSearch] = useState('');

  const onSearchChange = (e) => {
    setSearch({ ...search, [e.target.name]: e.target.value });
  };

  const onSearchClick = () => {
    categories.map((category) => {
      if (category === search) {
        getItems(search);
      }
    });
  };

  return (
    <Container>
      <Form>
        <Form.Group>
          <Row>
            <Dropdown className=''>
              <Dropdown.Toggle variant='success'>Categories</Dropdown.Toggle>
              <Dropdown.Menu>
                {categories.map((category, i) => {
                  return (
                    <Dropdown.Item key={i} value={i}>
                      {category}
                    </Dropdown.Item>
                  );
                })}
              </Dropdown.Menu>
            </Dropdown>
            <Form.Control
              className='col-sm-9 '
              type='text'
              placeholder='Search'
              name='search'
              onChange={(e) => onSearchChange(e)}
            />
            <Button
              className='col-sm-1 '
              variant='primary'
              type='submit'
              text='search'
              onClick={() => onSearchClick()}
            >
              <div className='searchText'>Search</div>
            </Button>
          </Row>
        </Form.Group>
      </Form>
    </Container>
  );
};

Shop.propTypes = {
  item: PropTypes.object,
  items: PropTypes.array,
  categories: PropTypes.array,
  getCategories: PropTypes.func.isRequired,
  getItem: PropTypes.func.isRequired,
  getItems: PropTypes.func.isRequired,
  getItemById: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  item: state.shop.item,
  items: state.shop.items,
  categories: state.shop.categories,
});

export default connect(mapStateToProps, { getCategories, getItem, getItems, getItemById })(Shop);
