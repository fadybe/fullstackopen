import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../reducers/userReducer";

const NavBar = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const linkStyle = {
    padding: 10,
    margin: 10,
  };

  const loggedIn = () => {
    return <></>;
  };

  return (
    user && (
      <div>
        <Link to="/" style={linkStyle}>
          home
        </Link>
        <Link to="/users" style={linkStyle}>
          users
        </Link>
        {user && (
          <>
            logged in as {user.name}
            <button
              onClick={() => {
                dispatch(logout());
              }}
            >
              logout
            </button>
          </>
        )}
      </div>
    )
  );
};

export default NavBar;
