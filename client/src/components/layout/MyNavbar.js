import React, { Fragment, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import { getCategories } from '../../actions/inventory';
import { getItems, getAllItems, setItems } from '../../actions/shop';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBars, faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const MyNavbar = ({
  logout,
  getItems,
  getCategories,
  categories,
  user,
  getAllItems,
  items,
  setItems,
}) => {
  useEffect(() => {
    getCategories();
    getAllItems();
  }, [getCategories, getAllItems]);
  const [search, setSearch] = useState('');
  const [hamburgerClick, setHamburgerClick] = useState(false);
  const [searchList, setSearchList] = useState();

  const onSearchChange = (e) => {
    const filtered = items.filter((item) => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });
    setSearch(e.target.value);
    setSearchList(filtered);
    console.log(searchList);
  };

  const onSearchClick = () => {
    let isCategory = false;
    categories.map((category) => {
      if (category.toLowerCase() === search.toLowerCase()) {
        const caps = search.charAt(0).toUpperCase() + search.slice(1);
        getItems(caps);
        isCategory = true;
      }
      if (category === search) {
        getItems(search);
        isCategory = true;
      }
    });
    if (!isCategory) {
      setItems(searchList);
    }
  };

  const onDropdownClick = (e, category) => {
    onSearchChange(e);
    setHamburgerClick(false);
    getItems(category);
  };

  const onHamburgerClick = () => {
    setHamburgerClick(!hamburgerClick);
  };

  return (
    <Fragment>
      <Navbar
        className='d-flex justify-content-center'
        style={{
          background: '#38281c',
          position: 'fixed',
          width: '100%',
          zIndex: '2',
          overflowY: 'hidden',
          overflowX: 'hidden',
        }}
      >
        <div className='SideElementContainer'>
          <Link to='/' style={{ color: 'white', fontSize: '20px' }}>
            {'Pets&Paws'}
          </Link>
        </div>
        <div className='InputBar'>
          <div className='Hamburger'>
            <button
              className='SearchButton'
              onClick={() => onHamburgerClick()}
              style={{ width: '35px' }}
            >
              <FontAwesomeIcon icon={faBars}></FontAwesomeIcon>
            </button>
            <div className='HamburgerItems'>
              {hamburgerClick &&
                categories.map((category, i) => {
                  return (
                    <Link to='/browse'>
                      <button
                        className='HamburgerItem'
                        key={i}
                        value={category}
                        name='search'
                        onClick={(e) => onDropdownClick(e, category)}
                      >
                        {category}
                      </button>
                    </Link>
                  );
                })}
            </div>
          </div>

          <input
            className='SearchInput'
            type='text'
            name='search'
            autoComplete='off'
            onChange={(e) => onSearchChange(e)}
          />
          <button className='SearchButton' onClick={() => onSearchClick()}>
            <Link to='/browse'>
              <FontAwesomeIcon icon={faSearch} />
            </Link>
          </button>
        </div>
        <div className='SideElementContainer'>
          <Nav className='align-items-center'>
            {user ? (
              <div>
                <Link to='/cart' style={{ marginRight: '5px' }}>
                  <FontAwesomeIcon icon={faShoppingCart} />
                </Link>
                <Navbar.Text>
                  <Link to='/dashboard' style={{ color: 'white', fontSize: '20px' }}>
                    Profile
                  </Link>
                </Navbar.Text>
                <Navbar.Text>
                  <a
                    onClick={logout}
                    href='!#'
                    style={{ color: 'white', margin: '5px', fontSize: '20px' }}
                  >
                    Logout
                  </a>
                </Navbar.Text>
              </div>
            ) : (
              <div>
                <Navbar.Text style={{ marginRight: '10px' }}>
                  <Link to='/register' style={{ color: 'white', margin: '5px', fontSize: '20px' }}>
                    Register
                  </Link>
                </Navbar.Text>
                <Navbar.Text>
                  <Link to='/login' style={{ color: 'white', margin: '5px', fontSize: '20px' }}>
                    Login
                  </Link>
                </Navbar.Text>
              </div>
            )}
          </Nav>
        </div>
      </Navbar>
    </Fragment>
  );
};

MyNavbar.propTypes = {
  categories: PropTypes.array,
  user: PropTypes.bool,
  items: PropTypes.array,
  logout: PropTypes.func.isRequired,
  getItems: PropTypes.func.isRequired,
  getCategories: PropTypes.func.isRequired,
  getAllItems: PropTypes.func.isRequired,
  setItems: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  categories: state.inventory.categories,
  user: state.auth.user,
  items: state.shop.items,
});

export default connect(mapStateToProps, { logout, getItems, getCategories, getAllItems, setItems })(
  MyNavbar
);
