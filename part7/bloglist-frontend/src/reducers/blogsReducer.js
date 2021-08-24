/* eslint-disable no-case-declarations */
import blogsService from "../services/blogs";
import { resetNotification, setNotification } from "./notificationsReducer";

export const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case "FETCH_BLOGS":
      return [...action.data.blogs];

    case "NEW_BLOG":
      return state.concat(action.data.blog);

    case "LIKE_BLOG":
      const newlyLikedBlog = action.data.blog;
      const newBlogs = state.map((blog) =>
        blog.id === newlyLikedBlog.id ? newlyLikedBlog : blog
      );
      newBlogs.sort((a, b) => a.likes - b.likes);
      return newBlogs;

    case "DELETE_BLOG":
      console.log(action.data.id);
      return state.filter((b) => b.id !== action.data.id);

    default:
      return state;
  }
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogsService.postNewBlog(blog);
      dispatch({
        type: "NEW_BLOG",
        data: { blog: newBlog },
      });
      dispatch(setNotification("created new post successfully!"));
    } catch (error) {
      dispatch(setNotification("could not submit new blog."));
    }
  };
};

export const fetchBlogs = () => {
  return async (dispatch) => {
    try {
      const blogs = await blogsService.getAll();
      dispatch({
        type: "FETCH_BLOGS",
        data: { blogs },
      });
    } catch (error) {
      dispatch(setNotification("something went wrong."));
      return {
        type: "FETCH_BLOGS",
        data: { blogs: null },
      };
    }
  };
};

export const likeBlog = (blogId) => {
  return async (dispatch) => {
    try {
      const newlyLikedBlog = await blogsService.likeBlog(blogId);
      dispatch({
        type: "LIKE_BLOG",
        data: { blog: newlyLikedBlog },
      });
    } catch (error) {
      dispatch(setNotification("something went wrong."));
    }
  };
};

export const deleteBlogAction = (blog) => {
  return async (dispatch) => {
    try {
      await blogsService.deleteBlog(blog.id);
      dispatch({
        type: "DELETE_BLOG",
        data: { id: blog.id },
      });
    } catch (error) {
      dispatch(setNotification("could not remove blog."));
    }
  };
};
