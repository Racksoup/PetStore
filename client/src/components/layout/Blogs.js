import React, { Fragment } from 'react';
import './Layout.css';
import { getAllBlogs } from '../../actions/blogs';

import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Blogs = ({ blogs, getAllBlogs }) => {
  return (
    <Fragment>
      <div className='FooterLinkComponent'>Blogs</div>
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
