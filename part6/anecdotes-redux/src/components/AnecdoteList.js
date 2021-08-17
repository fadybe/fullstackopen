import React from "react";

import { useSelector, useDispatch } from "react-redux";

import { vote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    if (state.filter === null) return state.anecdotes;

    const filter = state.filter;
    return state.anecdotes.filter((anecdote) =>
      anecdote.content.includes(filter)
    );
  });
  const dispatch = useDispatch();

  const handleVoteClick = (anecdote) => {
    dispatch(setNotification(`You voted for '${anecdote.content}'`, 2));
    dispatch(vote(anecdote));
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

export default AnecdoteList;
