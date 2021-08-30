import React, { useState } from "react";
import { useQuery, useSubscription } from "@apollo/client";

import { ALL_BOOKS, BOOK_ADDED } from "../queries";

const extractGenres = (books) => {
  const genres = new Set();
  for (const b of books) b.genres.forEach((g) => genres.add(g));
  return genres;
};

const Books = ({ notify, updateCacheWith }) => {
  const result = useQuery(ALL_BOOKS);

  const [selectedGenre, setSelectedGenre] = useState("");

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const bookAdded = subscriptionData.data.bookAdded;
      notify(`${bookAdded.title} added`);
      updateCacheWith(bookAdded);
    },
  });

  if (result.loading) return <div>Loading books...</div>;

  const genres = extractGenres(result.data.allBooks);

  return (
    <div>
      <h1>All Books</h1>
      <h3>Filter by genres</h3>
      viewing books of genre: {selectedGenre ? selectedGenre : "ALL BOOKS"}
      <div>
        <button key="all genres" onClick={() => setSelectedGenre("")}>
          all genres
        </button>
        {[...genres].map((g) => (
          <button
            key={g}
            onClick={() => {
              setSelectedGenre(g);
            }}
          >
            {g}
          </button>
        ))}
      </div>
      <table>
        <thead>
          <tr>
            <td>Title</td>
            <td>Publish Year</td>
            <td>Author</td>
          </tr>
        </thead>
        <tbody>
          {result.data.allBooks.map((book) => {
            if (selectedGenre) {
              if (book.genres.includes(selectedGenre))
                return (
                  <tr key={book.id}>
                    <td>{book.title}</td>
                    <td>{book.published}</td>
                    <td>{book.author.name}</td>
                  </tr>
                );
              return <div></div>;
            } else
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

export default Books;
