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
import SingleItem from './shop/SingleItem';
import BrowseItems from './shop/BrowseItems';
import ToS from './layout/ToS';
import Returns from './layout/Returns';
import Shipping from './layout/Shipping';
import Privacy from './layout/Privacy';
import Blogs from './layout/Blogs';
import CreateBlog from './layout/CreateBlog';
import SingleBlog from './layout/SingleBlog';
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
            <Route exact path='/item' component={SingleItem} />
            <Route exact path='/browse' component={BrowseItems} />
            <Route exact path='/tos' component={ToS} />
            <Route exact path='/returns' component={Returns} />
            <Route exact path='/shipping' component={Shipping} />
            <Route exact path='/privacy' component={Privacy} />
            <Route exact path='/blogs' component={Blogs} />
            <Route exact path='/create-blog' component={CreateBlog} />
            <Route exact path='/blog' component={SingleBlog} />
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
