import React, { useState, useEffect } from "react";

import { useSelector } from "react-redux";

const Notification = () => {
  const message = useSelector((state) => state.notification);

  return message ? <div className="error">{message}</div> : null;
};

export default Notification;
