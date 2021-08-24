const Blog = require("../src/models/blog");

const initialBlogs = [
  {
    title: "Article 1",
    author: "Shady",
    url: "https://article1.com",
    likes: 32,
  },
  {
    title: "Article 2",
    author: "Kirelos",
    url: "https://article2.com",
    likes: 29,
  },
  {
    title: "Article 3",
    author: "Mark",
    url: "https://article3.com",
    likes: 12,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  blogsInDb,
};
