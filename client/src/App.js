import React, { Fragment, useEffect } from 'react';
import './App.css';
import setAuthToken from './utils/setAuthToken';
import store from './store';
import { loadUser } from './actions/auth';
import MyNavbar from './components/layout/MyNavbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import Inventory from './components/inventory/Inventory';
import Shop from './components/shop/Shop';
import CreateItem from './components/inventory/CreateItem';
import UpdateHeaderImages from './components/inventory/UpdateHeaderImages';
import UpdateProfile from './components/dashboard/UpdateProfile';
import UpdateUser from './components/dashboard/UpdateUser';
import Cart from './components/dashboard/Cart';
import Orders from './components/dashboard/Orders';
import Wishlist from './components/dashboard/Wishlist';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/container';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <MyNavbar />
          <section className='App'>
            <Container>
              <Switch>
                <Route exact path='/' component={Shop} />
                <Route exact path='/login' component={Login} />
                <Route exact path='/register' component={Register} />
                <Route exact path='/dashboard' component={Dashboard} />
                <Route exact path='/inventory' component={Inventory} />
                <Route exact path='/create-item' component={CreateItem} />
                <Route exact path='/update-header-images' component={UpdateHeaderImages} />
                <Route exact path='/update-profile' component={UpdateProfile} />
                <Route exact path='/update-user' component={UpdateUser} />
                <Route exact path='/cart' component={Cart} />
                <Route exact path='/orders' component={Orders} />
                <Route exact path='/wish-list' component={Wishlist} />
              </Switch>
            </Container>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;

// style={{ border: 'solid', borderColor: '#38361c', borderRadius: '5px' }}
