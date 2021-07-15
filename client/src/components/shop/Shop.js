import React, { useState, useEffect } from 'react';
import { getCategories, getItem, getItems, getItemById } from '../../actions/shop';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/form';
import Col from 'react-bootstrap/col';
import Row from 'react-bootstrap/row';
import Container from 'react-bootstrap/container';
import Button from 'react-bootstrap/button';

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
    <Container fluid>
      <Form>
        <Form.Group>
          <Row>
            <Form.Control
              className='col-md-11'
              type='text'
              placeholder='Search'
              name='search'
              onChange={(e) => onSearchChange(e)}
            />

            <Button
              className='col-md-1'
              variant='primary'
              type='submit'
              onClick={() => onSearchClick()}
            >
              {' '}
              Search{' '}
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
