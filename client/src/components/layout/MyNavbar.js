import React, { Fragment, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { getItems, getCategories } from '../../actions/inventory';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

const MyNavbar = ({ logout, getItems, getCategories, categories }) => {
  useEffect(() => {
    getCategories();
  }, [getCategories]);
  const [search, setSearch] = useState('');

  const onSearchChange = (e) => {
    console.log(e.target.value);
    setSearch(e.target.value);
  };

  const onSearchClick = (e) => {
    e.preventDefault();
    categories.map((category) => {
      if (category === search) {
        getItems(search);
      }
    });
  };

  const onDropdownClick = (e) => {
    onSearchChange(e);
    onSearchClick();
  };

  return (
    <Fragment>
      <Navbar className='d-flex justify-content-center' style={{ background: '#38281c' }}>
        <Navbar.Text className='mr-auto pl-3'>
          <Link to='/' style={{ color: 'white', fontSize: '20px' }}>
            {'Pets&Paws'}
          </Link>
        </Navbar.Text>
        <InputGroup className='mx-auto mb-1 mt-1'>
          <select className='SearchDropdown'>
            <option className='SearchOption'>Categories</option>
            {categories.map((category, i) => {
              return (
                <option
                  className='SearchOption'
                  key={i}
                  value={category}
                  name='search'
                  onClick={(e) => onDropdownClick(e)}
                >
                  {category}
                </option>
              );
            })}
          </select>
          <input
            className='SearchInput'
            style={{ background: 'rgb(40,40,40)', border: 'none' }}
            type='text'
            name='search'
            onChange={(e) => onSearchChange(e)}
          />
          <button
            className='SearchButton'
            type='submit'
            text='search'
            onClick={(e) => onSearchClick(e)}
          >
            <div className='searchText'>Search</div>
          </button>
        </InputGroup>
        <Nav className='ml-auto align-items-center'>
          <Navbar.Text className=''>
            <Link to='/dashboard' style={{ color: 'white', fontSize: '20px' }}>
              Profile
            </Link>
          </Navbar.Text>
          <Navbar.Text>
            <Link to='/register' style={{ color: 'white', margin: '5px' }}>
              Register
            </Link>
          </Navbar.Text>
          <Navbar.Text>
            <Link to='/login' style={{ color: 'white', margin: '5px' }}>
              Login
            </Link>
          </Navbar.Text>
          <Navbar.Text>
            <Button
              onClick={logout}
              href='#!'
              style={{ color: 'white', margin: '5px', background: '#155e0d', border: 'none' }}
            >
              Logout
            </Button>
          </Navbar.Text>
        </Nav>
      </Navbar>
    </Fragment>
  );
};

MyNavbar.propTypes = {
  categories: PropTypes.array,
  logout: PropTypes.func.isRequired,
  getItems: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  categories: state.inventory.categories,
});

export default connect(mapStateToProps, { logout, getItems, getCategories })(MyNavbar);
