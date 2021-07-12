import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/button';

const inventory = (props) => {
  return (
    <div>
      Hello!
      <Link to='/dashboard'>
        <Button variant='primary'>Back To Dashboard</Button>
      </Link>
    </div>
  );
};

inventory.propTypes = {};

export default inventory;
