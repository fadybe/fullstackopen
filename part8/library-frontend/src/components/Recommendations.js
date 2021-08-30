import React, { useState, useEffect } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { BOOKS_BY_GENRE, FAVORITE_GENRES } from "../queries";

// TODO:
const Recommendations = () => {
  const genresQuery = useQuery(FAVORITE_GENRES);
  const [getBooksByGenre, results] = useLazyQuery(BOOKS_BY_GENRE);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    if (results.data) setBooks(results.data.allBooks);
  }, [results.data]);

  useEffect(() => {
    if (genresQuery.data)
      getBooksByGenre({
        variables: { genres: genresQuery.data.me.favoriteGenres },
      });
  }, [genresQuery.data, getBooksByGenre]);

  if (genresQuery.loading) return <div>Loading books...</div>;

  return (
    <div>
      <h1>Recommendations</h1>
      <h3>favorite genres: {genresQuery.data.me.favoriteGenres.join(", ")}</h3>
      <table>
        <thead>
          <tr>
            <td>Title</td>
            <td>Publish Year</td>
            <td>Author</td>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => {
            return (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.published}</td>
                <td>{book.author.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendations;
