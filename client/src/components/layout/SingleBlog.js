import React, { Fragment } from 'react';
import './Layout.css';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const SingleBlog = ({ blog }) => {
  let currentDate = new Date(blog.date);

  if (!blog || blog === null || undefined || Object.keys(blog).length === 0) {
    return <Redirect to='/blogs' />;
  }

  return (
    <Fragment>
      {blog && (
        <div className='FooterLinkComponent'>
          <h1>{blog.title}</h1>
          <h5>{currentDate.toDateString()}</h5>
          <div style={{ width: '400px', height: '200px' }}>
            <img className='Image' src={`api/inventory/image/${blog.image_filename}`} alt='' />
          </div>
          <div style={{ display: 'flex' }}>
            {blog.tags &&
              blog.tags.map((tag) => {
                return <p style={{ margin: '6px' }}>{tag}</p>;
              })}
          </div>
          <p style={{ marginTop: '20px' }}>{blog.text}</p>
        </div>
      )}
    </Fragment>
  );
};

SingleBlog.propTypes = {
  blog: PropTypes.object,
};

const mapStateToProps = (state) => ({
  blog: state.blogs.blog,
});

export default connect(mapStateToProps, {})(SingleBlog);
