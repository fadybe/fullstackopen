import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { deleteBlogAction, likeBlog } from "../reducers/blogsReducer";
import blogsService from "../services/blogs";
import { Button } from "@material-ui/core";
import { Card } from "@material-ui/core";

const Blog = (props) => {
  const { blog } = props;

  const dispatch = useDispatch();

  const [comment, setComment] = useState("");

  const submitComment = async (event) => {
    event.preventDefault();
    await blogsService.commentOnBlog(blog.id, comment);
    blog.comments.push(comment);
    setComment("");
  };

  const deleteBlog = () => {
    const confirmation = window.confirm(
      `Are yo sure you want to remove blog by ${blog.author}`
    );
    if (confirmation) dispatch(deleteBlogAction(blog));
  };

  const blogStyle = {
    margin: 10,
    paddingTop: 10,
    paddingLeft: 2,
    borderWidth: 1,
  };

  return (
    <Card>
      <div style={blogStyle}>
        <div>
          <h2>{blog.title}</h2>
          <Link to={`/users/${blog.user.id}`}>author: {blog.author}</Link>
        </div>
        <div>
          <div>RUL: {blog.url}</div>
          Likes: {blog.likes}
          <div>
            <Button
              variant="contained"
              onClick={() => {
                dispatch(likeBlog(blog.id));
              }}
            >
              Like
            </Button>
            <Button onClick={deleteBlog} value={comment} variant="contained">
              Remove
            </Button>
          </div>
          <h3>Comments</h3>
          <ul>
            {blog.comments.map((c) => (
              <li key={Math.random()}>{c}</li>
            ))}
          </ul>
          <form onSubmit={submitComment}>
            <input
              onChange={(event) => {
                setComment(event.target.value);
              }}
              value={comment}
            />
            <button type="submit">add comment</button>
          </form>
        </div>
      </div>
    </Card>
  );
};

export default Blog;
