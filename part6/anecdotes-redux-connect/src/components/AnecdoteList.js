import React from "react";

import { connect } from "react-redux";

import { vote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = (props) => {
  const anecdotes = props.anecdotes;

  const handleVoteClick = (anecdote) => {
    props.setNotification(`You voted for '${anecdote.content}'`, 10);
    props.vote(anecdote);
  };

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVoteClick(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state) => {
  if (state.filter === null) return { anecdotes: state.anecdotes };

  const filter = state.filter;

  const anecdotes = state.anecdotes.filter((anecdote) =>
    anecdote.content.includes(filter)
  );

  return {
    anecdotes,
  };
};

const mapDispatchToProps = {
  vote,
  setNotification,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
