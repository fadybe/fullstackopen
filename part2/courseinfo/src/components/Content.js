import React from "react";

import Part from "./Part";

const Content = (props) => {
  const { parts } = props;

  return (
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};

export default Content;
