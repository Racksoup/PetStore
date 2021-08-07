import React, { Fragment, useState } from 'react';
import './Dashboard';
import { createBlogPost } from '../../actions/blogs';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/alert';

const CreateBlog = ({ createBlogPost }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    tags: null,
    text: '',
  });
  const [newFile, setNewFile] = useState('');
  const [tagsHolder, setTagsHolder] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [redirect, setRedirect] = useState(false);

  const { title, tags, text } = newBlog;

  const onChange = (e) => {
    setNewBlog({ ...newBlog, [e.target.name]: e.target.value });
  };

  const onTagChange = (e) => {
    setTagsHolder(e.target.value);
    const newTags = e.target.value.split(' ');
    setNewBlog({ ...newBlog, tags: [...newTags] });
  };

  const onFileChange = (e) => {
    setNewFile(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (tagsHolder === '') {
      setNewBlog({ ...newBlog, tags: [] });
    }

    if (title !== '' && text !== '' && newFile !== '' && tags) {
      createBlogPost(newBlog, newFile);
      setRedirect(true);
    } else {
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 2000);
    }
  };

  if (redirect) {
    return <Redirect to='/edit-blogs' />;
  }

  return (
    <Fragment>
      {showAlert && (
        <Alert
          variant='secondary'
          style={{ position: 'absolute', width: '600px', left: '35%' }}
          onClose={() => setShowAlert(false)}
          dismissible
        >
          Please fill out all fields
        </Alert>
      )}
      <div className='CreateBlogPost'>
        <h1 className='CreateBlogTitle'>Create Blog Post</h1>
        <form className='CreateBlogForm' onSubmit={(e) => onSubmit(e)}>
          <div className='EntryContainer'>
            <h5 className='EntryTag'>Title:</h5>
            <input
              className='EntryInput'
              type='text'
              name='title'
              value={title}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='EntryContainer'>
            <h5 className='EntryTag'>Tags:</h5>
            <input
              className='EntryInput'
              type='text'
              name='tagsHolder'
              value={tagsHolder}
              onChange={(e) => onTagChange(e)}
            />
          </div>
          <div className='EntryContainer'>
            <h5 className='EntryTag'>Text:</h5>
            <input
              className='EntryInput'
              type='text'
              name='text'
              value={text}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className='EntryContainer'>
            <h5 className='EntryTag'>Image:</h5>
            <input
              className='EntryInput'
              type='file'
              name='file'
              onChange={(e) => onFileChange(e)}
            />
          </div>
          <input type='submit' value='Submit' />
        </form>
      </div>
    </Fragment>
  );
};

CreateBlog.propTypes = { createBlogPost: PropTypes.func.isRequired };

export default connect(null, { createBlogPost })(CreateBlog);
