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
              </Switch>
            </Container>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
