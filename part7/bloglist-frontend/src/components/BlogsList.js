import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Card } from "@material-ui/core";

const BlogsList = () => {
  const blogs = useSelector((state) => state.blogs);
  const ulStyle = {
    listStyle: "none",
    padding: 0,
  };
  const liStyle = {
    margin: 10,
    padding: 10,
  };

  return (
    <div>
      <ul style={ulStyle}>
        {blogs.map((blog) => (
          <li key={blog.id} style={liStyle}>
            <Card>
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </Card>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default BlogsList;
