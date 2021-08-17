const reducer = (state = null, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      if (action.data.notification === "") return null;
      return action.data.notification;
    default:
      return state;
  }
};

export default reducer;

export const setNotification = (content, seconds) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_NOTIFICATION",
      data: { notification: content },
    });
    setTimeout(() => {
      dispatch({
        type: "SET_NOTIFICATION",
        data: { notification: null },
      });
    }, seconds * 1000);
  };
};
