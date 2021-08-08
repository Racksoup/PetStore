import React, { Fragment, useEffect } from 'react';
import '../App.css';
import { loadUser, loadAdmin } from '../actions/auth';
import MyNavbar from './layout/MyNavbar';
import Footer from './layout/Footer';
import Login from './auth/Login';
import Register from './auth/Register';
import Dashboard from './dashboard/Dashboard';
import Inventory from './inventory/Head';
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
import CreateBlog from './dashboard/CreateBlog';
import SingleBlog from './layout/SingleBlog';
import EditBlogs from './dashboard/EditBlogs';
import EditBlog from './dashboard/EditBlog';
import AdminDashboard from './dashboard/AdminDashboard';
import AdminLogin from './auth/AdminLogin';
import spinner from '../images/Spinner.gif';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';

const Base = ({ loading, user, isUser, loadUser, loadAdmin }) => {
  useEffect(() => {
    if (isUser) loadUser();
  }, []);

  useEffect(() => {
    if (!isUser) loadAdmin();
  }, []);

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
            <Route exact path='/admin-dashboard' component={AdminDashboard} />
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
            <Route exact path='/edit-blogs' component={EditBlogs} />
            <Route exact path='/edit-blog' component={EditBlog} />
            <Route exact path='/admin-login' component={AdminLogin} />
          </Switch>
        </Container>
      </section>
      <Footer />
    </Fragment>
  );
};

Base.propTypes = {
  loading: PropTypes.bool,
  user: PropTypes.object,
  isUser: PropTypes.bool,
  loadUser: PropTypes.func.isRequired,
  loadAdmin: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  loading: state.auth.loading,
  user: state.auth.user,
  isUser: state.auth.user,
});

export default connect(mapStateToProps, { loadUser, loadAdmin })(Base);
