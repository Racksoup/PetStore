import React, { Fragment } from 'react';
import '../App.css';
import MyNavbar from './layout/MyNavbar';
import Footer from './layout/Footer';
import Login from './auth/Login';
import Register from './auth/Register';
import Dashboard from './dashboard/Dashboard';
import Inventory from './inventory/Inventory';
import Shop from './shop/Shop';
import CreateItem from './inventory/CreateItem';
import UpdateHeaderImages from './inventory/UpdateHeaderImages';
import Profile from './dashboard/Profile';
import User from './dashboard/User';
import Cart from './dashboard/Cart';
import Orders from './dashboard/Orders';
import Wishlist from './dashboard/Wishlist';
import spinner from '../images/Spinner.gif';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/container';

const Base = ({ loading }) => {
  if (loading) {
    return <img src={spinner} className='center' alt='loading' />;
  }

  return (
    <Fragment>
      <MyNavbar />
      <section className='App'>
        <section className='Background'></section>
        <Container>
          <Switch>
            <Route exact path='/' component={Shop} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/dashboard' component={Dashboard} />
            <Route exact path='/inventory' component={Inventory} />
            <Route exact path='/create-item' component={CreateItem} />
            <Route exact path='/update-header-images' component={UpdateHeaderImages} />
            <Route exact path='/update-profile' component={Profile} />
            <Route exact path='/update-user' component={User} />
            <Route exact path='/cart' component={Cart} />
            <Route exact path='/orders' component={Orders} />
            <Route exact path='/wish-list' component={Wishlist} />
          </Switch>
        </Container>
      </section>
      <Footer />
    </Fragment>
  );
};

Base.propTypes = {
  loading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
});

export default connect(mapStateToProps, {})(Base);
