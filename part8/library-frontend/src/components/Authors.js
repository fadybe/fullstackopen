import React from "react";
import { useQuery } from "@apollo/client";
import { ALL_AUTHORS } from "../queries";
import BirthYearForm from "./BirthYearForm";

const Authors = () => {
  const result = useQuery(ALL_AUTHORS);

  if (result.loading) return <div>Loading authors...</div>;

  return (
    <div>
      <h1>All Authors</h1>
      <table>
        <thead>
          <tr>
            <td>Author</td>
            <td>Born year</td>
            <td>Books</td>
          </tr>
        </thead>
        <tbody>
          {result.data.allAuthors.map((author) => (
            <tr key={author.id}>
              <td>{author.name}</td>
              <td>{author.born}</td>
              <td>{author.books}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <BirthYearForm authors={result.data.allAuthors} />
    </div>
  );
};

export default Authors;
