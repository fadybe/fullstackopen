const express = require("express");
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");

const router = express.Router();

router.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user");
  return response.json(blogs);
});

router.get("/:id", async (req, res) => {
  const blogId = req.params.id;
  const blog = await Blog.findById(blogId);
  return res.status(200).json(blog);
});

router.put("/:id/like", async (req, res) => {
  const blogId = req.params.id;

  const blog = await Blog.findById(blogId);
  if (blog.likers.includes(req.user.id))
    return res.status(400).json({ error: "already liked" });
  blog.likers.push(req.user.id);
  blog.likes = blog.likers.length;
  await blog.save();

  return res.status(201).json(blog);
});

router.delete("/:id", async (req, res, next) => {
  if (!req.token) return res.status(400).json({ error: "invalid token" });

  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  const blog = await Blog.findById(req.params.id);
  if (!blog) return res.status(404).json({ error: "blog not found" });

  if (blog.user.toString() !== decodedToken.id)
    return res.status(400).json({ error: "unauthorized" });

  await blog.remove();
  return res.status(200).send();
});

router.put("/:id", async (req, res, next) => {
  const blog = await Blog.findOneAndUpdate(
    { _id: req.params.id },
    { ...req.body },
    { new: true }
  );

  if (!blog) return res.status(404).json({ error: "blog not found" });
  return res.status(200).json(blog);
});

router.post("/", async (request, response, next) => {
  const blog = new Blog(request.body);

  const user = request.user;
  blog.user = user._id;

  try {
    const result = await blog.save();
    return response.status(201).json(result);
  } catch (e) {
    console.log(e);
    return response.status(400).json({ error: "could not create blog" });
  }
});

module.exports = router;
