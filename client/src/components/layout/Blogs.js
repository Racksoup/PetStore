import React, { Fragment, useEffect } from 'react';
import './Layout.css';
import { getAllBlogs, setBlog } from '../../actions/blogs';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Blogs = ({ blogs, getAllBlogs, setBlog }) => {
  useEffect(() => {
    getAllBlogs();
  }, [getAllBlogs]);

  return (
    <Fragment>
      <h1 style={{ textAlign: 'center', marginTop: '15px' }}>Blogs</h1>
      <div className='BlogsBox'>
        {blogs &&
          blogs.map((blog) => {
            let currentDate = new Date(blog.date);
            return (
              <div className='Blog' onClick={() => setBlog(blog)}>
                <Link className='LinkFormat' to='/blog'>
                  <div className='BlogImageContainer'>
                    <img className='Image' src={`api/blogs/image/${blog.image_filename}`} alt='' />
                  </div>
                  <p>{currentDate.toDateString()}</p>
                  <div className='TagsBox'>
                    {blog.tags.map((tag) => {
                      return <p style={{ padding: '2px' }}>{tag}</p>;
                    })}
                  </div>
                  <h3>{blog.title}</h3>
                </Link>
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
  setBlog: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  blogs: state.blogs.blogs,
});

export default connect(mapStateToProps, { getAllBlogs, setBlog })(Blogs);
