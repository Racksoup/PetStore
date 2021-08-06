import React, { Fragment, useEffect } from 'react';
import '../layout/Layout.css';
import { getAllBlogs, setBlog } from '../../actions/blogs';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const EditBlogs = ({ blogs, getAllBlogs, setBlog }) => {
  useEffect(() => {
    getAllBlogs();
  }, [getAllBlogs]);

  return (
    <Fragment>
      <h1 style={{ textAlign: 'center', marginTop: '15px' }}>Edit Blogs</h1>
      <div className='BlogsBox'>
        {blogs &&
          blogs.map((blog) => {
            let currentDate = new Date(blog.date);
            return (
              <div className='Blog' onClick={() => setBlog(blog)}>
                <Link to='/edit-blog'>
                  <div className='BlogImageContainer'>
                    <img className='Image' src={`api/blogs/image/${blog.image_filename}`} />
                  </div>
                  <p>{currentDate.toDateString()}</p>
                  <div className='TagsBox'>
                    {blog.tags.map((tag) => {
                      return <p>{tag} </p>;
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

EditBlogs.propTypes = {
  blogs: PropTypes.array,
  getAllBlogs: PropTypes.func.isRequired,
  setBlog: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  blogs: state.blogs.blogs,
});

export default connect(mapStateToProps, { getAllBlogs, setBlog })(EditBlogs);
