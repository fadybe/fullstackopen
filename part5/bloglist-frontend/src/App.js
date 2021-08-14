import React, { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Toggleable from "./components/Toggleable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const newBlogFormRef = useRef();

  useEffect(() => {
    const jsonUser = window.localStorage.getItem("loggedInUser");
    if (jsonUser) {
      const user = JSON.parse(jsonUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    if (user)
      blogService
        .getAll()
        .then((blogs) => setBlogs(blogs))
        .catch(() => {
          setErrorMessage("something went wrong");
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
  }, [user]);

  const logout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const submitLogin = async (credentials) => {
    try {
      const loggedUser = await loginService.login(credentials);
      window.localStorage.setItem("loggedInUser", JSON.stringify(loggedUser));
      blogService.setToken(loggedUser.token);
      setUser(loggedUser);
      const blogs = await blogService.getAll();
      setBlogs(blogs);
    } catch (e) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const submitNewBlog = async (newBlog) => {
    try {
      const newAddedBlog = await blogService.postNewBlog(newBlog);
      setBlogs(blogs.concat(newAddedBlog));
      newBlogFormRef.current.toggleVisibility();
    } catch (error) {
      setErrorMessage("Could not submit new blog!");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const likeBlog = async (blogId) => {
    console.log("liked blog of id: ", blogId);
    try {
      const newlyLikedBlog = await blogService.likeBlog(blogId);

      const newBlogs = blogs.map((blog) =>
        blog.id === blogId ? newlyLikedBlog : blog
      );

      newBlogs.sort((a, b) => a.likes - b.likes);

      setBlogs(newBlogs);
    } catch (error) {
      setErrorMessage("Could not like blog!");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const deleteBlog = async (blog) => {
    console.log("deleting blog of id: ", blog.id);
    const confirmation = window.confirm(
      `Are yo sure you want to remove blog by ${blog.author}`
    );
    if (confirmation) {
      try {
        await blogService.deleteBlog(blog.id);
        const newBlogs = blogs.filter((b) => b.id !== blog.id);
        setBlogs(newBlogs);
      } catch (error) {
        setErrorMessage("Could not remove blog!");
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
    }
  };

  return (
    <div>
      <Notification message={errorMessage} />

      {user === null ? (
        <Toggleable buttonLabel="Login" toggled={false}>
          <LoginForm submitLogin={submitLogin} />
        </Toggleable>
      ) : (
        <div>
          <h2>blogs</h2>
          <div>
            <p>
              logged in as {user.name}
              <button onClick={logout}>logout</button>
            </p>
          </div>
          <Toggleable
            buttonLabel="Create new blog"
            toggled={true}
            ref={newBlogFormRef}
          >
            <BlogForm submitNewBlog={submitNewBlog} />
          </Toggleable>

          <div>
            {blogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                likeBlog={() => {
                  likeBlog(blog.id);
                }}
                deleteBlog={() => {
                  deleteBlog(blog);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
