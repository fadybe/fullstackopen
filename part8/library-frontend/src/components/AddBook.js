import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { SUBMIT_BOOK, ALL_BOOKS, ALL_AUTHORS } from "../queries";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genres, setGenres] = useState([]);
  const [genre, setGenre] = useState("");

  //TODO
  const [submitBook] = useMutation(SUBMIT_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
  });

  const handleBookSubmission = (event) => {
    event.preventDefault();

    const book = {
      title,
      author,
      published,
      genres,
    };
    console.log(book);

    submitBook({ variables: { ...book } });
    setTitle("");
    setAuthor("");
    setGenre("");
    setPublished("");
    setGenres([]);
  };

  return (
    <div>
      <form onSubmit={handleBookSubmission}>
        <div>
          title:
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          author:
          <input
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <div>
          published:
          <input
            value={published}
            onChange={(event) =>
              setPublished(Number.parseInt(event.target.value))
            }
          />
        </div>
        <div>
          <div>
            <input
              value={genre}
              onChange={(event) => setGenre(event.target.value)}
            />
            <button
              onClick={(event) => {
                event.preventDefault();
                console.log(genre);
                setGenres([...genres, genre]);
                setGenre("");
              }}
            >
              add genre
            </button>
          </div>
          genres: {genres.join(", ")}
        </div>
        <button type="submit">submit book</button>
      </form>
    </div>
  );
};
export default AddBook;
