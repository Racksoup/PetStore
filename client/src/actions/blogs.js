import FormData from 'form-data';
import {
  BLOGS_ERROR,
  CREATE_BLOG,
  GOT_ALL_BLOGS,
  GOT_THREE_BLOGS,
  GOT_ONE_BLOG,
  BLOG_DELETED,
  SET_BLOG,
} from './types';
import axios from 'axios';

export const createBlogPost = (item, file) => async (dispatch) => {
  let data = new FormData();
  data.append('file', file);
  data.append('title', item.title);
  data.append('text', item.text);
  if (item.tags) {
    for (let i = 0; i < item.tags.length; i++) {
      data.append('tags', item.tags[i]);
    }

    //data.append('tags', item.tags);
  }

  try {
    const config = {
      headers: {
        accept: 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
      },
    };
    const res = axios.post('/api/blogs', data, config);
    console.log(res);
    dispatch({
      type: CREATE_BLOG,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getAllBlogs = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/blogs');
    dispatch({
      type: GOT_ALL_BLOGS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getThreeBlogs = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/blogs/three');
    dispatch({
      type: GOT_THREE_BLOGS,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getOne = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/blogs/${id}`);
    dispatch({
      type: GOT_ONE_BLOG,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteBlog = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/blogs/${id}`);
    dispatch({
      type: BLOG_DELETED,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const setBlog = (blog) => (dispatch) => {
  dispatch({
    type: SET_BLOG,
    payload: blog,
  });
};
