export const setNotification = (content, seconds) => {
  return async (dispatch) =>
    dispatch({
      type: "SET_NOTIFICATION",
      data: {
        notification: content,
        timeoutid: setTimeout(() => {
          dispatch(resetNotification());
        }, seconds * 1000),
      },
    });
};

export const resetNotification = () => {
  return { type: "RESET_NOTIFICATION" };
};

const reducer = (state = null, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      clearTimeout(action.data.timeoutid);
      return action.data.notification;

    case "RESET_NOTIFICATION":
      return null;

    default:
      return state;
  }
};

export default reducer;
