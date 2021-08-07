import FormData from 'form-data';
import {
  BLOGS_ERROR,
  CREATE_BLOG,
  GOT_ALL_BLOGS,
  GOT_THREE_BLOGS,
  GOT_ONE_BLOG,
  BLOG_DELETED,
  SET_BLOG,
  UPDATE_BLOG,
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

export const updateBlog = (item, file, id) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const oldItem = await axios.get(`/api/blogs/${id}`);
    if (file !== '' && file !== null && file !== undefined) {
      let data = new FormData();
      data.append('file', file);
      const fileConfig = {
        headers: {
          accept: 'application/json',
          'Accept-Language': 'en-US,en;q=0.8',
          'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
        },
      };
      console.log(oldItem);
      await axios.delete(`/api/blogs/deleteimage/${oldItem.data.image_filename}`);
      const newImage = await axios.post('/api/blogs/uploadimage', data, fileConfig);
      item.image_filename = newImage.data.file.filename;
    }
    if (item) {
      const body = JSON.stringify(item);
      const res = await axios.put(`/api/blogs/${id}`, item, config);
      dispatch({
        type: UPDATE_BLOG,
        payload: res.data,
      });
    }
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

export const deleteBlog = (item) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/blogs/${item._id}`);
    await axios.delete(`api/blogs/deleteimage/${item.image_filename}`);
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
