import React, { useState, useEffect } from "react";
import { Switch, Link, Route } from "react-router-dom";
import AddBook from "./components/AddBook";
import LoginForm from "./components/LoginForm";

import Authors from "./components/Authors";
import Books from "./components/Books";
import { ALL_BOOKS } from "./queries";

import { useApolloClient } from "@apollo/client";
import Recommendations from "./components/Recommendations";

function App() {
  const [token, setToken] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const client = useApolloClient();

  const updateCacheWith = (addedBook) => {
    console.log("========> updatecachewith");
    const includedIn = (set, object) =>
      set.map((p) => p.id).includes(object.id);

    const dataInStore = client.readQuery({ query: ALL_BOOKS });
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      });
    }
  };

  const notify = (message) => {
    console.log("notified with: ", message);
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  useEffect(() => {
    const cachedToken = localStorage.getItem("user-token");
    if (cachedToken) setToken(cachedToken);
  }, []);

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  if (!token)
    return (
      <div>
        <Notify errorMessage={errorMessage} />
        <h2>Login</h2>
        <LoginForm setToken={setToken} setError={notify} />
      </div>
    );

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <Link to="/authors">
        <button>authors</button>
      </Link>
      <Link to="/books">
        <button>books</button>
      </Link>
      <Link to="/addbook">
        <button>add book</button>
      </Link>
      <Link to="/recommendations">
        <button>recommendations</button>
      </Link>

      <Switch>
        <Route path="/authors">
          <Authors />
        </Route>
        <Route path="/books">
          <Books notify={notify} updateCacheWith={updateCacheWith} />
        </Route>
        <Route path="/addbook">
          <AddBook />
        </Route>
        <Route path="/recommendations">
          <Recommendations />
        </Route>
      </Switch>

      <button onClick={logout}>logout</button>
    </div>
  );
}

export default App;

const Notify = ({ errorMessage }) => {
  if (!errorMessage) return null;
  return <div style={{ color: "red" }}> {errorMessage} </div>;
};
