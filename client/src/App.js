import React, { useEffect } from 'react';

import setAuthToken from './utils/setAuthToken';
import store from './store';
import { loadUser } from './actions/auth';
import Base from './components/Base';

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

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
        <Base />
      </Router>
    </Provider>
  );
};

export default App;

// style={{ border: 'solid', borderColor: '#38361c', borderRadius: '5px' }}
