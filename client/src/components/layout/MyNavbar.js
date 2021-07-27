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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars } from '@fortawesome/free-solid-svg-icons';

const MyNavbar = ({ logout, getItems, getCategories, categories }) => {
  useEffect(() => {
    getCategories();
  }, [getCategories]);
  const [search, setSearch] = useState('');
  const [hamburgerClick, setHamburgerClick] = useState(false);

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const onSearchClick = () => {
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

  const onHamburgerClick = () => {
    setHamburgerClick(!hamburgerClick);
  };

  return (
    <Fragment>
      <Navbar className='d-flex justify-content-center' style={{ background: '#38281c' }}>
        <Navbar.Text className='mr-auto pl-3'>
          <Link to='/' style={{ color: 'white', fontSize: '20px' }}>
            {'Pets&Paws'}
          </Link>
        </Navbar.Text>

        <div className='InputBar'>
          <div className='Hamburger'>
            <button onClick={() => onHamburgerClick()} style={{ borderRadius: '5px' }}>
              <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
            </button>
            <div className='HamburgerItems'>
              {hamburgerClick &&
                categories.map((category, i) => {
                  return (
                    <button
                      className='HamburgerItem'
                      key={i}
                      value={category}
                      name='search'
                      onClick={(e) => onDropdownClick(e)}
                    >
                      {category}
                    </button>
                  );
                })}
            </div>
          </div>

          <input
            className='SearchInput'
            style={{ color: 'white', background: 'rgb(40,40,40)', border: 'none' }}
            type='text'
            name='search'
            autoComplete='off'
            onChange={(e) => onSearchChange(e)}
          />
          <button className='SearchButton' type='submit' onClick={() => onSearchClick()}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>

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
