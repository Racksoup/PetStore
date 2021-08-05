import {
  BLOGS_ERROR,
  CREATE_BLOG,
  GOT_ALL_BLOGS,
  GOT_THREE_BLOGS,
  GOT_ONE_BLOG,
  BLOG_DELETED,
  SET_BLOG,
} from '../actions/types';

const initialState = {
  blogs: [],
  blog: {},
};

export default function blogs(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case BLOG_DELETED:
      return {
        ...state,
        blogs: state.blogs.filter((blog) => blog._id !== payload._id),
        blog: {},
      };
    case BLOGS_ERROR:
      return {
        ...state,
      };
    case CREATE_BLOG:
      return {
        ...state,
        blogs: [...state.blogs, payload],
      };
    case GOT_THREE_BLOGS:
    case GOT_ALL_BLOGS:
      return {
        ...state,
        blogs: payload,
      };
    case GOT_ONE_BLOG:
    case SET_BLOG:
      return {
        ...state,
        blog: payload,
      };
    default:
      return state;
  }
}
