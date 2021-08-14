import React, { useState } from "react";
const Blog = (props) => {
  const { blog, likeBlog, deleteBlog } = props;

  const [folded, setFolded] = useState(true);

  const handleFold = () => {
    setFolded(!folded);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle}>
      <div>
        Title: {blog.title}, by author: {blog.author}
        <button onClick={handleFold}>{folded ? "view" : "hide"}</button>
      </div>
      <div style={{ display: folded ? "none" : "" }}>
        <div>RUL: {blog.url}</div>
        <div>
          Likes: {blog.likes}
          <button onClick={likeBlog}>Like</button>
        </div>
        <button onClick={deleteBlog}>Remove</button>
      </div>
    </div>
  );
};

export default Blog;
