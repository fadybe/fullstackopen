import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Blog from "../components/Blog";
import blogsService from "../services/blogs";

const BlogView = () => {
  const id = useParams().id;

  const [blog, setBlog] = useState(null);

  const fetchBlog = async () => {
    const fetchedBlog = await blogsService.getBlogById(id);
    setBlog(fetchedBlog);
  };

  useEffect(() => {
    fetchBlog();
  }, [blog]);

  useEffect(() => {
    const cleanup = () => setBlog(null);
    return cleanup;
  }, []);

  return blog && <Blog blog={blog} />;
};

export default BlogView;
