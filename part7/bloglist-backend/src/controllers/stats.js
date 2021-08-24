const express = require("express");
const jwt = require("jsonwebtoken");
const Blog = require("../models/blog");
const User = require("../models/user");

const router = express.Router();

router.get("/stats", async (req, res, next) => {
  if (!req.token) return res.status(400).json({ error: "invalid token" });
  const decodedToken = jwt.verify(req.token, process.env.SECRET);

  const results = await User.aggregate([
    {
      $group: {
        _id: "$_id",
        name: {
          $first: "$name",
        },
      },
    },
    {
      $lookup: {
        from: "blogs",
        localField: "_id",
        foreignField: "user",
        as: "blogs",
      },
    },
    {
      $project: {
        name: 1,
        blogsCount: {
          $size: "$blogs",
        },
      },
    },
  ]);

  return res.status(200).json(results);
});

module.exports = router;
