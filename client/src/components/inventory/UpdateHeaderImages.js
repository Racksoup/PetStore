import React, { useState, useEffect } from 'react';
import { submitFile, removeHeaderImage } from '../../actions/inventory';
import { getHeaderImages } from '../../actions/shop';
import './Inventory.css';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';

const UpdateHeaderImages = ({
  submitFile,
  headerImages,
  getHeaderImages,
  removeHeaderImage,
  imageLoading,
}) => {
  useEffect(() => {
    getHeaderImages();
  }, [getHeaderImages]);

  const [alert, setAlert] = useState(false);
  const [File, setFile] = useState('');
  const onSubmit = (e) => {
    e.preventDefault();
    if (File) {
      submitFile(File);
    } else {
      setAlert(true);
      setTimeout(() => {
        setAlert(false);
      }, 2000);
    }
  };

  const onChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div>
      <div className='TitleBox'>
        <Link to='dashboard'>
          <button className='BackButton'>Back</button>
        </Link>
        <h3 className='HeaderImagesTitle'>
          Update Header Images{' '}
          {alert && (
            <Alert
              variant='secondary'
              style={{ position: 'fixed', width: '600px', marginLeft: '-150px', marginTop: '15px' }}
              onClose={() => setAlert(false)}
              dismissible
            >
              Please select an image
            </Alert>
          )}
        </h3>
      </div>
      <form className='UploadForm' onSubmit={(e) => onSubmit(e)}>
        <p className='UploadText'>Add New Header Image:</p>
        <input className='UploadInput' id='file' type='file' onChange={(e) => onChange(e)} />

        {imageLoading ? (
          <div className='UploadButton'>
            <input type='submit' value='Submit' />
            <p className='LoadingTag'>Loading...</p>
          </div>
        ) : (
          <input className='UploadButton' type='submit' value='Submit' />
        )}
      </form>
      <div className='HeaderImagesFlexBox'>
        {headerImages.map((image) => {
          return (
            <div className='HeaderImageContainer' onClick={() => removeHeaderImage(image.filename)}>
              <img
                className='HeaderImage'
                src={`/api/headerimage/image/${image.filename}`}
                alt={image.filename}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

UpdateHeaderImages.propTypes = {
  submitFile: PropTypes.func.isRequired,
  getHeaderImages: PropTypes.func.isRequired,
  removeHeaderImage: PropTypes.func.isRequired,
  headerImages: PropTypes.array,
  imageLoading: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  headerImages: state.shop.headerImages,
  imageLoading: state.shop.imageLoading,
});

export default connect(mapStateToProps, { submitFile, getHeaderImages, removeHeaderImage })(
  UpdateHeaderImages
);
