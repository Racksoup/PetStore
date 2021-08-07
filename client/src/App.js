import React from 'react';
import setAuthToken from './utils/setAuthToken';
import store from './store';
import Base from './components/Base';

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Base />
      </Router>
    </Provider>
  );
};

export default App;
