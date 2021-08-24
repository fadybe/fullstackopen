import loginService from "../services/login";
import blogService from "../services/blogs";
import statsService from "../services/stats";
import usersService from "../services/user";

import { setNotification } from "./notificationsReducer";

export const userReducer = (state = null, action) => {
  switch (action.type) {
    case "LOG_IN":
      return action.data.user;

    case "LOG_OUT":
      window.localStorage.clear();
      return null;

    default:
      return state;
  }
};

export const initUser = () => {
  return async (dispatch) => {
    const jsonUser = window.localStorage.getItem("loggedInUser");
    if (jsonUser) {
      const user = JSON.parse(jsonUser);
      blogService.setToken(user.token);
      statsService.setToken(user.token);
      usersService.setToken(user.token);
      dispatch({
        type: "LOG_IN",
        data: { user },
      });
    } else dispatch({ type: "LOG_IN", data: { user: null } });
  };
};

export const login = (credentials) => {
  return async (dispatch) => {
    try {
      const loggedUser = await loginService.login(credentials);
      window.localStorage.setItem("loggedInUser", JSON.stringify(loggedUser));
      blogService.setToken(loggedUser.token);
      statsService.setToken(loggedUser.token);
      const blogs = await blogService.getAll();
      dispatch({
        type: "LOG_IN",
        data: { user: loggedUser },
      });
    } catch (e) {
      dispatch(setNotification("wrong credentials!"));
      dispatch({
        type: "LOG_IN",
        data: { user: null },
      });
    }
  };
};

export const logout = () => {
  return {
    type: "LOG_OUT",
  };
};
