import React, { Fragment } from 'react';

import fakeImage from '../../images/CatGrass.jpg';
import PropTypes from 'prop-types';

const Blog = (props) => {
  const fakeBlogs = [
    {
      date: 'Feb 02, 2021',
      title: 'Cool Day',
      image: fakeImage,
    },
    {
      date: 'Jan 21, 2021',
      title: 'Fun Time at the Park',
      image: fakeImage,
    },
    {
      date: 'Dec 01, 2021',
      title: 'First Snow',
      image: fakeImage,
    },
  ];

  return (
    <Fragment>
      <div className='ShopBackground' style={{ height: '505px' }}></div>
      <div className='BlogSectionContainer'>
        <div className='BlogSectionTitleContainer'>
          <h3 className='BlogSectionTitle'>Our Blog</h3>
          <br />
          <button className='BlogSectionButton'>Veiw all</button>
        </div>
        <div className='AllBlogsContainer'>
          {fakeBlogs.map((blog) => {
            return (
              <div className='BlogContainer'>
                <div className='BlogImageContainer'>
                  <img className='BlogImage' src={blog.image} alt={blog.title} />
                </div>
                <h6 className='BlogDate'>{blog.date}</h6>
                <h4 className='BlogTitle'>{blog.title}</h4>
              </div>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};

Blog.propTypes = {};

export default Blog;
