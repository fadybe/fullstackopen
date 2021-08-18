let notificationId = null;

export const setNotification = (content, seconds) => {
  return async (dispatch) => {
    if (notificationId) clearTimeout(notificationId);
    dispatch(showNotification(content));
    notificationId = setTimeout(() => {
      dispatch(resetNotification());
    }, seconds * 1000);
  };
};

export const showNotification = (content) => {
  return { type: "SET_NOTIFICATION", data: { notification: content } };
};

export const resetNotification = () => {
  return { type: "RESET_NOTIFICATION" };
};

const reducer = (state = null, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.data.notification;

    case "RESET_NOTIFICATION":
      return null;

    default:
      return state;
  }
};

export default reducer;
