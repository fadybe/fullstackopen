import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import Toggleable from "../components/Toggleable";
import LoginForm from "../components/LoginForm";
import BlogForm from "../components/BlogForm";
import BlogsList from "../components/BlogsList";
import { initUser, logout } from "../reducers/userReducer";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const newBlogFormRef = useRef();

  // TODO: toggleVisibility on creating new blog
  //   newBlogFormRef.current.toggleVisibility();

  return (
    <div>
      {!user ? (
        <Toggleable buttonLabel="Login" toggled={false}>
          <LoginForm />
        </Toggleable>
      ) : (
        <div>
          <h2>blogs</h2>

          <Toggleable
            buttonLabel="Create new blog"
            toggled={true}
            ref={newBlogFormRef}
          >
            <BlogForm />
          </Toggleable>

          <BlogsList />
        </div>
      )}
    </div>
  );
};

export default Home;
