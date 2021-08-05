import React, { Fragment } from 'react';
import './Layout.css';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const SingleBlog = ({ blog }) => {
  return (
    <Fragment>
      <div className='FooterLinkComponent'>
        <h1>{blog.title}</h1>
        <h5>{blog.date}</h5>
        {blog.tags.map((tag) => {
          return <p>{tag}</p>;
        })}
        <p>{blog.text}</p>
      </div>
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
