import anecdotesService from "../services/anecdotes";

const sortAnecdotes = (anecdotes) => {
  return anecdotes.sort((a, b) => b.votes - a.votes);
};

const reducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE":
      const id = action.data.id;
      const votedAnecdote = state.find((a) => a.id === id);
      const changedAnecdote = {
        ...votedAnecdote,
        votes: votedAnecdote.votes + 1,
      };
      return sortAnecdotes(
        state.map((a) => (a.id !== id ? a : changedAnecdote))
      );
    case "INIT_ANECDOTES":
      return sortAnecdotes(action.data);
    case "NEW_ANECDOTE":
      return sortAnecdotes([...state, action.data]);
    default:
      return state;
  }
};

export default reducer;

export const vote = (anecdote) => {
  return async (dispatch) => {
    await anecdotesService.updateAnecdote(anecdote.id, {
      ...anecdote,
      votes: anecdote.votes + 1,
    });

    dispatch({
      type: "VOTE",
      data: { id: anecdote.id },
    });
  };
};

export const newAnecdote = (anecdote) => {
  return async (dispatch) => {
    const createdAnecdote = await anecdotesService.createAnecdote({
      ...anecdote,
      votes: 0,
    });
    dispatch({
      type: "NEW_ANECDOTE",
      data: createdAnecdote,
    });
  };
};

export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes,
    });
  };
};
