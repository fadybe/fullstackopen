import React from "react";
import { connect } from "react-redux";
import { newAnecdote } from "../reducers/anecdoteReducer";

const AnecdoteForm = (props) => {
  const addAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    props.newAnecdote({ content });
  };

  return (
    <div>
      <h2>Add new anecdote</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote" />
        <button type="submit">add</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = {
  newAnecdote,
};

export default connect(null, mapDispatchToProps)(AnecdoteForm);
