import React, { Fragment, useState } from 'react';
import './Layout.css';
import { createBlogPost } from '../../actions/blogs';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const CreateBlog = ({ createBlogPost }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    tags: null,
    text: '',
  });
  const [newFile, setNewFile] = useState('');
  const [tagsHolder, setTagsHolder] = useState('');

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
    }
  };

  return (
    <Fragment>
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
