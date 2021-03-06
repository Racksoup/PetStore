import React, { Fragment, useState } from 'react';
import { updateBlog, deleteBlog } from '../../actions/blogs';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Alert from 'react-bootstrap/Alert';

const EditBlog = ({ blog, updateBlog, deleteBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: blog.title,
    tags: blog.tags,
    text: blog.text,
    image_filename: blog.image_filename,
  });
  const [newFile, setNewFile] = useState('');
  const [tagsHolder, setTagsHolder] = useState(blog.tags.join(' '));
  const [showAlert, setShowAlert] = useState(false);

  const { title, text } = newBlog;

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
    updateBlog(newBlog, newFile, blog._id);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 1500);
  };

  return (
    <Fragment>
      {showAlert && (
        <Alert
          variant='secondary'
          style={{ position: 'absolute', width: '400px', left: '40%' }}
          onClose={() => setShowAlert(false)}
          dismissible
        >
          BLOG UPDATED
        </Alert>
      )}
      {blog && (
        <div className='UpdateSingleBlog'>
          <div className='UpdateSingleHeader'>
            <button onClick={() => deleteBlog(blog)}>
              <Link className='LinkFormat' to='/edit-blogs'>
                Delete Blog
              </Link>
            </button>
          </div>
          <form className='UpdateBlogForm' onSubmit={(e) => onSubmit(e)}>
            <div className='UpdateSingleBlogInputRow'>
              <h5>Title:</h5>
              <input
                className='UpdateSingleBlogInput'
                type='text'
                name='title'
                value={title}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='UpdateSingleBlogInputRow'>
              <h5>Tags:</h5>
              <input
                className='UpdateSingleBlogInput'
                type='text'
                name='tagsHolder'
                value={tagsHolder}
                onChange={(e) => onTagChange(e)}
              />
            </div>
            <div className='UpdateSingleBlogInputRow'>
              <h5>Text:</h5>
              <input
                className='UpdateSingleBlogInput'
                type='text'
                name='text'
                value={text}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className='UpdateSingleBlogInputRow'>
              <h5>Text:</h5>
              <input
                className='UpdateSingleBlogInput'
                type='file'
                name='file'
                onChange={(e) => onFileChange(e)}
              />
            </div>
            <input type='submit' value='Submit' />
          </form>
        </div>
      )}
    </Fragment>
  );
};

EditBlog.propTypes = {
  blog: PropTypes.object,
  updateBlog: PropTypes.func.isRequired,
  deleteblog: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  blog: state.blogs.blog,
});

export default connect(mapStateToProps, { updateBlog, deleteBlog })(EditBlog);
