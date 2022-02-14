import React, { Fragment, useEffect } from 'react';
import { setBlog, getThreeBlogs } from '../../actions/blogs';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const Blog = ({ blogs, setBlog, getThreeBlogs }) => {
  useEffect(() => {
    getThreeBlogs();
  }, [getThreeBlogs]);

  return (
    <Fragment>
      <div className='ShopBackground' style={{ height: '505px' }}></div>
      {blogs && (
        <div className='BlogSectionContainer'>
          <div className='BlogSectionTitleContainer'>
            <h3 className='BlogSectionTitle'>Our Blog</h3>
            <br />
            <Link to='/blogs'>
              <button className='BlogSectionButton'>Veiw all</button>
            </Link>
          </div>
          <div className='AllBlogsContainer'>
            {blogs.map((blog) => {
              let currentDate = new Date(blog.date);
              return (
                <Link className='LinkFormat' to='/blog'>
                  <div className='BlogContainer' onClick={() => setBlog(blog)}>
                    <div className='BlogImageContainer'>
                      <img
                        className='BlogImage'
                        src={`api/blogs/image/${blog.image_filename}`}
                        alt={blog.title}
                      />
                    </div>
                    <h6 className='BlogDate'>{currentDate.toDateString()}</h6>
                    <h4 className='BlogTitle'>{blog.title}</h4>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </Fragment>
  );
};

Blog.propTypes = {
  blogs: PropTypes.array,
  setBlog: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  blogs: state.blogs.blogs,
});

export default connect(mapStateToProps, { setBlog, getThreeBlogs })(Blog);
