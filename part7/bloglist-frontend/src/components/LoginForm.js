import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../reducers/userReducer";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = async (event) => {
    event.preventDefault();
    const credentials = { username, password };
    dispatch(login(credentials));
  };

  return (
    <div>
      <h1>Log in to blogs app</h1>

      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </div>

        <div>
          password
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>

        <button type="submit" id="login-submit-button">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
