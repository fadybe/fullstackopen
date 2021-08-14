import React from "react";
import "@testing-library/jest-dom/extend-expect";
import { render, fireEvent } from "@testing-library/react";
import Blog from "./Blog";

test("renders content", () => {
  const blog = {
    title: "blog title",
    likes: 23,
    url: "https://url.com",
    author: "mark",
  };

  const component = render(<Blog blog={blog} />);

  expect(component.container).toHaveTextContent("blog title");
});
