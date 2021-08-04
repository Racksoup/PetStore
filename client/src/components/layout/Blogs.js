import React, { Fragment, useEffect } from 'react';
import './Layout.css';
import { getAllBlogs } from '../../actions/blogs';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Blogs = ({ blogs, getAllBlogs }) => {
  useEffect(() => {
    getAllBlogs();
  }, [getAllBlogs]);

  return (
    <Fragment>
      <h1 style={{ textAlign: 'center', marginTop: '15px' }}>Blogs</h1>
      <div className='BlogsBox'>
        {blogs &&
          blogs.map((blog) => {
            return (
              <div className='Blog'>
                <div className='BlogImageContainer'>
                  <img className='Image' src={`api/blogs/image/${blog.image_filename}`} />
                </div>
                <p>{blog.date}</p>
                <div className='TagsBox'>
                  {blog.tags.map((tag) => {
                    return <p>{tag} </p>;
                  })}
                </div>
                <h3>{blog.title}</h3>
              </div>
            );
          })}
      </div>
    </Fragment>
  );
};

Blogs.propTypes = {
  blogs: PropTypes.array,
  getAllBlogs: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  blogs: state.blogs.blogs,
});

export default connect(mapStateToProps, { getAllBlogs })(Blogs);
