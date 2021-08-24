export const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      // clearTimeout(action.data.timeoutid);
      return action.data.message;

    case "RESET_NOTIFICATION":
      console.log("reset notification action called");
      return null;

    default:
      return state;
  }
};

export const setNotification = (message) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_NOTIFICATION",
      data: {
        message,
        timeoutid: setTimeout(() => {
          dispatch(resetNotification());
        }, 5000),
      },
    });
  };
};

export const resetNotification = () => {
  return {
    type: "RESET_NOTIFICATION",
  };
};
