import statsService from "../services/stats";

export const statsReducer = (state = null, action) => {
  switch (action.type) {
    case "GET_STATS":
      return action.data.stats;

    default:
      return state;
  }
};

export const getStats = () => {
  console.log("get stats called...");
  return async (dispatch) => {
    const stats = await statsService.getStats();
    dispatch({
      type: "GET_STATS",
      data: { stats },
    });
  };
};
