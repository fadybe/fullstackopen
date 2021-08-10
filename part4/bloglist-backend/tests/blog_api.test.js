const supertest = require("supertest");
const mongoose = require("mongoose");
const app = require("../src/app");

const Blog = require("../src/models/blog");

const helper = require("./test_helper");
const note = require("../../notes-backend/models/note");
const User = require("../src/models/user");

const api = supertest(app);

let user1token;
let user2token;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });

  await User.deleteMany({});
  const user1 = { username: "username1", password: "password1", name: "user1" };
  const user2 = { username: "username2", password: "password2", name: "user2" };

  await api.post("/api/users").send(user1);
  await api.post("/api/users").send(user2);

  const u1login = await api
    .post("/api/login")
    .send({ username: user1.username, password: user1.password });

  const u2login = await api
    .post("/api/login")
    .send({ username: user2.username, password: user2.password });

  user1token = u1login.body.token;
  user2token = u2login.body.token;

  console.log(user1token);
  console.log(user2token);
}, 10000);

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test("get all blogs in database", async () => {
  const response = await api
    .get("/api/blogs")
    .set("Authorization", `Bearer ${user1token}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);
  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("id to be defined", async () => {
  const response = await api
    .get("/api/blogs")
    .set("Authorization", `Bearer ${user1token}`)
    .expect(200);
  expect(response.body[0].id).toBeDefined();
});

test("create new post", async () => {
  const newBlog = {
    title: "new blog",
    author: "anonymous",
    url: "http://anon.com",
    likes: 35,
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .set("Authorization", `Bearer ${user1token}`)
    .expect(201);
  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
});

test("default likes is zero", async () => {
  const newBlog = {
    title: "new blog",
    author: "anonymous",
    url: "http://anon.com",
  };
  const response = await api
    .post("/api/blogs")
    .set("Authorization", `Bearer ${user1token}`)
    .send(newBlog)
    .expect(201);
  expect(response.body.likes).toEqual(0);
});

test("title and url are required", async () => {
  const newBlog = {
    author: "anonymous",
    url: "http://anon.com",
  };
  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .set("Authentication", `Bearer ${user1token}`)
    .expect(400);
});

test("reject signup request with missing username", async () => {
  const newUser = {
    name: "as",
    username: "username",
    password: "passwordme",
  };
  const response = await api.post("/api/users").send(newUser).expect(400);
});

afterAll(() => {
  mongoose.connection.close();
});
