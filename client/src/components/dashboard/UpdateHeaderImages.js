import React, { useState } from 'react';
import { submitFile } from '../../actions/profile';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const UpdateHeaderImages = ({ submitFile }) => {
  const [File, setFile] = useState('');
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(File);
    submitFile(File);
  };

  const onChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div>
      <form onSubmit={(e) => onSubmit(e)}>
        <input id='file' type='file' onChange={(e) => onChange(e)} />

        <input type='submit' value='Submit' />
      </form>
    </div>
  );
};

UpdateHeaderImages.propTypes = {
  submitFile: PropTypes.func.isRequired,
};

export default connect(null, { submitFile })(UpdateHeaderImages);