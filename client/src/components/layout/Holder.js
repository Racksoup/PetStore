import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Holder = (props) => {
  return (
    <h1>
      Hello<Link to='/item'>link</Link>
    </h1>
  );
};

export default Holder;
