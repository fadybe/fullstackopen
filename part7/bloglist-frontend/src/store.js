import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import jwt_decode from "jwt-decode";
import { notificationReducer } from "./reducers/notificationsReducer";
import { initUser, userReducer } from "./reducers/userReducer";
import { blogsReducer } from "./reducers/blogsReducer";
import { statsReducer } from "./reducers/statsReducer";

const checkTokenExpirationMiddleware = (store) => (next) => (action) => {
  const token =
    JSON.parse(localStorage.getItem("loggedInUser")) &&
    JSON.parse(localStorage.getItem("loggedInUser"))["token"];

  if (token && jwt_decode(token).exp < Date.now() / 1000) {
    next(action);
    localStorage.clear();
  }

  next(action);
};

const reducer = combineReducers({
  user: userReducer,
  notification: notificationReducer,
  blogs: blogsReducer,
  stats: statsReducer,
});

const store = createStore(
  reducer,
  applyMiddleware(thunk, checkTokenExpirationMiddleware)
);
store.dispatch(initUser());

export default store;
