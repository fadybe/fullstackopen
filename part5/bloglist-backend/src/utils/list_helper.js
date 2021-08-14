const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((a, b) => a + b.likes, 0);
};

const mostBlogs = (blogs) => {
  const results = [];
  blogs.reduce((res, value) => {
    if (!res[value.author]) {
      res[value.author] = { author: value.author, blogs: 0 };
      results.push(res[value.author]);
    }
    res[value.author].blogs += 1;
    return res;
  }, {});

  results.sort((a, b) => b.blogs - a.blogs);

  return results.length === 0 ? null : results[0];
};

const mostLikes = (blogs) => {
  const results = [];
  blogs.reduce((res, value) => {
    if (!res[value.author]) {
      res[value.author] = { author: value.author, likes: 0 };
      results.push(res[value.author]);
    }
    res[value.author].likes += value.likes;
    return res;
  }, {});

  results.sort((a, b) => b.likes - a.likes);

  return results.length === 0 ? null : results[0];
};

module.exports = {
  dummy,
  totalLikes,
  mostLikes,
  mostBlogs,
};
