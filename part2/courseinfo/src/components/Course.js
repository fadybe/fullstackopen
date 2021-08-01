import React from "react";

import Header from "./Header";
import Total from "./Total";
import Content from "./Content";

const Course = (props) => {
  const { name, parts } = props.course;

  const totalExercises = parts.reduce((p, c) => p + c.exercises, 0);

  return (
    <div>
      <Header text={name} />
      <Content parts={parts} />
      <Total totalExercises={totalExercises} />
    </div>
  );
};

export default Course;
