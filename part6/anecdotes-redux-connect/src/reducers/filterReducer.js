const reducer = (state = null, action) => {
  switch (action.type) {
    case "SET_FILTER":
      if (action.data.filter === "") return null;
      return action.data.filter;
    default:
      return state;
  }
};

export default reducer;

export const setFilter = (filter) => {
  return {
    type: "SET_FILTER",
    data: { filter },
  };
};
