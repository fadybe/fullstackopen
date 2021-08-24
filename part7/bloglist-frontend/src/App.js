import React, { useEffect, useRef } from "react";
import Notification from "./components/Notification";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "./reducers/blogsReducer";
import { Route, Switch } from "react-router-dom";
import UsersView from "./views/users";
import Home from "./views/home";
import UserView from "./views/user";
import BlogView from "./views/blog";
import NavBar from "./components/Navbar";
import { Container } from "@material-ui/core";

const App = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user) dispatch(fetchBlogs());
  }, [user]);

  return (
    <Container>
      <Notification />

      <NavBar />

      <Switch>
        <Route path="/users/:id">
          <UserView />
        </Route>

        <Route path="/users">
          <UsersView />
        </Route>

        <Route path="/blogs/:id">
          <BlogView />
        </Route>

        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Container>
  );
};

export default App;
